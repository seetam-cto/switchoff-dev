import axios from "axios";

export const registerLead = async (data) =>
    await axios.get(`https://nuura.switchoff.in/booking-leads/add?name=${data.name}&phone=${data.phone}&property=${data.propertyId}&hotelId=${data.hoteId}&roomCode=${data.roomCode}&rateCode=${data.rateCode}&dates=${data.dates}&atPrice=${data.atPrice}&location=${data.location}`)