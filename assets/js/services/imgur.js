var ClientID = '90f58e42cf3f991';

function addImage(img){
    $.ajax({ 
        url: 'https://api.imgur.com/3/image',
        headers: {
            'Authorization': 'Client-ID ' +ClientID
        },
        type: 'POST',
        data: {
            'image': 'img'
        },
        success: function() { console.log('cool'); }
    });
};

function getImage(id){
    $.ajax({ 
        url: 'https://api.imgur.com/3/image/'+ id,
        headers: {
            'Authorization': 'Client-ID ' +ClientID
        },
        type: 'GET',
        data: {
            'image': 'img'
        },
        success: function() { console.log('cool'); }
    });
};
