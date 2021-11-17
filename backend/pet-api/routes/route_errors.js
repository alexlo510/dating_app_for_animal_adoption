const nopetexistserror = {
    "Error": "No Pet with this pet_id exists"
};

const nonewsexistserror = {
    "Error": "No News Item with this news_id exists"
};

const unknownservererrror = {
    "Error": "Unknown server error"
};

const invalidtokenerror = {
    "Error": "Missing or invalid id_token"
};

const unauthorizederror = {
    "Error": "You are not authorized to perform this action"
};

const methodnoallowederror = {
    "Error": "Method not allowed"
};

const fileuploaderror = {
    "Error": "Error uploading file."
};



const notacceptableerror = "Not Acceptable By Client, Server can only respond JSON";

const contenttypeerror = "Server only accepts application/json payload";

module.exports = {
    nopetexistserror,
    nonewsexistserror,
    unknownservererrror,
    invalidtokenerror,
    unauthorizederror,
    methodnoallowederror,
    notacceptableerror,
    contenttypeerror,
    fileuploaderror
};