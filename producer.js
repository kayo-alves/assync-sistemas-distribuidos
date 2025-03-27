const amqp = require("amqplib")
async function produce()
{
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel(); // declara como chegar na fila
        const queue = 'mensagens';
        await channel.assertQueue(queue, {durable: false});

        let messageCount = 1;

        setInterval(() => {
            const message = `Messagem ${messageCount}`;
            channel.sendToQueue(queue, Buffer.from(message)); // converte string para binário para ser aceito na fila
            console.log(`Enviada: ${mensagem}`);
            messageCount++;
        }, 2000); // 2000 milisegundos = 2 segundos
    } catch (error){
        console.error("Error:", error);
    }
}
produce();