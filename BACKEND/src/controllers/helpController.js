import HelpRequest from "../models/HelpRequestModel.js";

export const createHelpRequest = async(req, res)=>{
    try {
        const {title, description} = req.body;
        const userId = req.user.id;

        const newRequest = new HelpRequest({
            userId, title, description
        })

        await newRequest.save();

        return res.status(200).json({
            success: true,
            request : newRequest
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


export const deleteRequest = async(req, res)=>{
    try {
        const {requestId} = req.params;
        const userId = req.user.id;
        const request = await HelpRequest.findById(requestId);

        if(!request){
            return res.status(404).json({
                message: "Request not found!",
                success: false
            })
        }

        if(request.userId.toString() !== userId.toString()){
            return res.status(400).json({
                message: "You are not authorize to delete this request!",
                success: false
            })
        }

        await HelpRequest.deleteOne({_id: requestId});

        return res.status(200).json({
            message: "Request deleted successfully!",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


export const getAllRequests = async(req, res)=>{
    try {
        const requests = await HelpRequest.find().populate("userId", "name, username email");
        if(requests.length == 0){
            return res.status(404).json({
                message: "Requests not found!",
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            requests
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const getAllPendingRequests = async(req, res)=>{
    try {
        const requests = await HelpRequest.find({status : "pending"}).populate("userId", "name, username email");
        if(requests.length == 0){
            return res.status(404).json({
                message: "Pending Requests not found!",
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            requests
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const getMyRequests =  async(req, res)=>{
    try {
        const userId = req.user.id;
        const myRequests = await HelpRequest.find({userId})
        if(myRequests.length == 0){
            return res.status(404).json({
                message: "Requests not found!",
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            myRequests
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


export const acceptRequest = async(req, res)=>{
    try {
        const {requestId} = req.params;
        const userId = req.user.id;
        const {Date, Time} = req.body;

        if(!Date || !Time){
            return res.status(400).json({
                message: "Date and Time is important!",
                success: false
            })
        }

        const request = await HelpRequest.findById(requestId)
        if(!request){
            return res.status(404).json({
                message: "Request not found!",
                success: false
            })
        }

        if(request.userId.toString() === userId.toString()){
            return res.status(400).json({
                message: "You can't accept self request!",
                success: false
            })
        }

        if(request.status !== "pending"){
            return res.status(400).json({
                message: "Request already accepted/declined",
                success: false
            })
        }

        request.status = "accepted";
        request.helperId = userId;
        request.ackStatus = "waiting";
        request.scheduledTime.Date = Date;
        request.scheduledTime.Time = Time;

        await request.save();

        return res.status(200).json({
            success: true,
            request
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const declineRequest = async(req, res)=>{
    try {
        const {requestId} = req.params;
        const userId = req.user.id;

        const request = await HelpRequest.findById(requestId);
        if(!request){
            return res.status(404).json({
                message: "Request not found!",
                success: false
            })
        }

        if(request.userId.toString() === userId.toString()){
            return res.status(400).json({
                message: "You can't decline self request!",
                success: false
            })
        }

        if(request.helperId?.toString() === userId.toString()){
            request.status = "pending",
            request.helperId = null,
            request.ackStatus = "waiting"

            await request.save();
        }

        return res.status(200).json({
            success: true,
            message: "Declined successfull!",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const acknowledgeHelper = async(req, res)=>{
    try {
        const {requestId} = req.params;
        const {ackStatus} = req.body;
        const userId = req.user.id;

        const request = await HelpRequest.findById(requestId);
        if(!request){
            return res.status(404).json({
                message: "Request not found!",
                success: false
            })
        } 

        if(request.status !== "accepted"){
            return res.status(400).json({
                message: "Request is pending, not accepted by any helper",
                success: false
            })
        }

        if(request.userId.toString() !== userId.toString()){
            return res.status(400).json({
                message: "You can't acknowledge other's request!",
                success: false
            })
        }

        if(ackStatus === "accepted"){
            request.ackStatus = "accepted";
        }else{
            request.ackStatus = "declined"
            request.status = "pending"
            request.helperId = null;
        }

        await request.save()

        return res.status(200).json({
            success: true,
            message: "Request accepted",
            request
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


export const completeRequest = async(req, res)=>{
    try {
        const {requestId} = req.params;
        const userId = req.user.id;

        const request = await HelpRequest.findById(requestId);
        if(!request){
            return res.status(404).json({
                message: "Request not found!",
                success: false
            })
        } 

        if(request.status !== "accepted" || request.ackStatus !== "accepted"){
            return res.status(400).json({
                message: "Request is not accepted by helper or requester",
                success: false
            })
        }

        if(request.userId.toString() !== userId.toString()){
            return res.status(400).json({
                message: "You can't complete other's request!",
                success: false
            })
        }

        request.status = "completed";
        await request.save();

        return res.status(200).json({
            message: "Request completed!",
            success: true,
            request
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}