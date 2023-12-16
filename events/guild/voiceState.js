const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
    const player = client.manager.players.get(message.guild.id);
    if (!player) return;
    const channel = message.member.voice.channel;
    const botVoiceChannel = message.guild.me.voice.channel;
    let pauseMessage = null;
    let hasSentPausedMessage = false; // Biến để kiểm tra xem đã gửi phản hồi tạm dừng hay chưa
    let timeoutId = null; // Khởi tạo biến timeout

    client.on('voiceStateUpdate', (oldState, newState) => {
        // State test
        const oldMember = oldState.member;
        const newMember = newState.member;
        const botVoiceChannel = oldMember.guild.me.voice.channel;
        const embed = new MessageEmbed()
            .setTitle("No one in the voice channel, Paused!")
            .setDescription("The player will disconnect after 5 minutes!");

        if (botVoiceChannel) {
            const botChannelMembers = botVoiceChannel.members.size;

            // Kiểm tra nếu trong kênh thoại có người dùng ngoại trừ bot
            if (botChannelMembers === 1 && botVoiceChannel.members.first().user.bot && player.playing) {
                // Kênh thoại trống, tạm dừng hoặc dừng nhạc
                player.pause(true)
                const textChannel = client.channels.cache.get(player.textChannel);
                if (!hasSentPausedMessage) {
                    textChannel.send(embed)
                        .then(m => {
                            pauseMessage = m; // Lưu tham chiếu đến tin nhắn tạm dừng
                        })
                        .catch(error => console.error(error));
                }
                hasSentPausedMessage = true;
            } else {
              if (pauseMessage) {
                pauseMessage.delete().then(() => {
                    pauseMessage = null // Đặt tham chiếu về null sau khi xóa tin nhắn
                }).catch(error => console.error(error))
              }
                // Kênh thoại có người tham gia, tiếp tục hoặc phát nhạc
                hasSentPausedMessage = false
                player.pause(false) // Tiếp tục phát nhạc
            }
          if (!botVoiceChannel.members.size !== 1 || !botVoiceChannel.members.first().user.bot) {
            if (timeoutId !== null) {
                clearTimeout(timeoutId); // Hủy sự kiện timeout nếu điều kiện không đáp ứng
                timeoutId = null; // Đặt lại biến timeoutId về null sau khi hủy
            }
          }
          // Tự động thoát khỏi voice sau 5 phút nếu không có người dùng
            if (botVoiceChannel.members.size === 1 && botVoiceChannel.members.first().user.bot && player.state !== 'DISCONNECTED') {
            timeoutId = setTimeout(async () => {
            player.destroy();
            const textChannel = client.channels.cache.get(player.textChannel);
            textChannel.send(":wave: **I'm leaving because no one is in the voice channel**")
            }, 300000); // 5000 milliseconds = 5 giây
          }
        }
    });
};