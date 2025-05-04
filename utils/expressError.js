
class expressError extends Error{
    constructor(status,message){
        super();
        this.status;
        this.message;
    }
}

module.exports=expressError;