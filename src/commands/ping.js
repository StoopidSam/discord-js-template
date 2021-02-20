module.exports = {
    name: 'ping',
    description: 'Returns the latency.',
    execute(message, args, client) {
        message.channel.send(`:ping_pong: Pong! Your ping is \`${Date.now() - message.createdTimestamp}ms\`.`).catch(() => { return });
    },
};