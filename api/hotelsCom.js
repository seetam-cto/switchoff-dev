import axios from "axios";
import { getSearchParams } from "@/components/Search";
import { useAtom } from "jotai";

export const getHotelOffers = async (hid,pid,searchPs) => {
    const options = {
        method: 'GET',
        url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/offers',
        params: {
            adults_number: searchPs.adults_number,
            checkout_date: searchPs.checkout_date,
            domain: 'IN',
            locale: 'en_IN',
            hotel_id: hid,
            checkin_date: searchPs.checkin_date,
            children_ages: searchPs.children_ages
        },
        headers: {
            'X-RapidAPI-Key': '6271b80fd0mshc0400cac01bdce0p15148ajsn6de442ea5abe',
            'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }
    }
    try{
        let propertyData = await axios.get(`https://stage.switchoff.in/api/property/${pid}`)
        let hotelOffers = await axios.request(options)
        let hoteldata = {
            info: propertyData.data,
            offers: hotelOffers.data
        }
        return hoteldata
    }catch(err){
        console.log(err)
        return "ERROR: CHECK CONSOLE"
    }
}