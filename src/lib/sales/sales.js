
const SOLD_KEYWORD = '!sold' 
const CANCEL_KEYWORD = '!cancel'

async function getItemReference ( message, client ) {
    if (message.reference == null) {
        return message.reference;
    }

    const channel   = client.channels.cache.get(message.reference.channelId);
    const reference = await channel.messages.fetch(message.reference.messageId);

    return reference; 
}

module.exports = {
    dispatch ( message, client ) { 
        switch (message.content) {
            case SOLD_KEYWORD   : sold  (message, client); break;
            case CANCEL_KEYWORD : cancel(message, client); break;
        }
    }
};

async function sold (message, client){
    const item = await getItemReference(message, client);
    if (item != null) {
        ["💰", "🪙", "💵"].forEach(icon => {
            item.react(icon);
        });
    }
} 

async function cancel (message, client){
    const item = await getItemReference(message, client);
    if (item != null) {
        item.reactions.removeAll();
    }
} 


