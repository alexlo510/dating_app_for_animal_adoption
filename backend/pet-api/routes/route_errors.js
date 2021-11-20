const nopetexistserror = {
    "Error": "No Pet exists"
};

const nonewsexistserror = {
    "Error": "No News Item exists"
};

const nonuserexistserror = {
    "Error": "No User exists"
};

const unknownservererrror = {
    "Error": "Unknown server error"
};

const invalidtokenerror = {
    "Error": "Missing or invalid accesstoken"
};

const unauthorizederror = {
    "Error": "You are not authorized to perform this action"
};

const methodnoallowederror = {
    "Error": "Method not allowed"
};

const fileuploaderror = {
    "Error": "Error uploading file"
};


const notacceptableerror = "Not Acceptable By Client, Server can only respond JSON";

const contenttypeerror = "Server only accepts application/json payload";

module.exports = {
    nopetexistserror,
    nonewsexistserror,
    nonuserexistserror,
    unknownservererrror,
    invalidtokenerror,
    unauthorizederror,
    methodnoallowederror,
    notacceptableerror,
    contenttypeerror,
    fileuploaderror
};