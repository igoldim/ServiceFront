/* https://stackoverflow.com/questions/52830312/how-to-upload-image-to-server-using-axios-in-react-native
//faz upload de documentos
var data = new FormData();
    data.append('UserId',userId);
    data.append('AppId',appId);
    data.append('Latitude',latitude);
    data.append('Longitude',longitude);
    data.append('DocumentoIdentidade',
    {
        uri:documentoIdentidade,
        name:'documentoIdentidade.png',
        type:'image/png'
    });
    data.append('DocumentoEndereco',
    {
        uri:documentoEndereco,
        name:'documentoEndereco.png',
        type:'image/png'
    });
    data.append('DocumentoAntecedente',
    {
        uri:documentoAntecedente,
        name:'documentoAntecedente.png',
        type:'image/png'
    });
    data.append('DocumentoSefie',
    {
        uri:documentoSefie,
        name:'documentoSefie.png',
        type:'image/png'
    });

    */