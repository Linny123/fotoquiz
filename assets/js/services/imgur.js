
function addImage(img){
    $.ajax({ 
        url: 'https://api.imgur.com/3/image',
        headers: {
            'Authorization': 'Client-ID 90f58e42cf3f991'
        },
        type: 'POST',
        data: {
            'image': 'img'
        },
        success: function() { console.log('cool'); }
    });


}
