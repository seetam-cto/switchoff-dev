import axios from "axios";

export const getHomePageContent = async () => {
    let data = JSON.stringify({
        query: `query HomePages {
        homePages {
          destinations {
            heading
            description
            link
            items {
              ... on DestinationItem {
                heading
                subHeading
                tag
                coverImage {
                  url(transformation: {image: {resize: {height: 500}}})
                }
              }
            }
          }
        }
      }`,
        variables: {}
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api-ap-south-1.hygraph.com/v2/clly5pz0z1jvo01un97so6uma/master',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2OTM0MjY3MjksImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NsbHk1cHowejFqdm8wMXVuOTdzbzZ1bWEvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6IjJlMTFlMWRlLTEzMDAtNDM2OS04ZTU0LTdkZjEyNzliZmE3ZiIsImp0aSI6ImNsbHk2anZmeTFrMmMwMXQ1MDB2cGdjc2YifQ.zWPAvL8z8I6Sm3MmJsrph_DsOr2of0HwVVigLVtUj_2_eqiNhXapQKYph-QbaeRxjAd0MldffpbT8ihS8wYHHBiydArOTJTyIq14p2xT3bmoqAk74EUVpGebYSLZAXxMKff9wLZmUv7osJ3GhgUKygMWLikrqFJb0JRzS27s7TbIEG7qtkaZJ7dkhs1gQm8mSbElvjXfgTr3bHAeNMgWrrB5HYaoujPk7t2tA2rSqbsc0N4t4_SeQbuYglv8koFxDA0cGSVPnobwNYfptYFlPeLP6xUgQ1RkHnds7jP5K9g-7i6Bkzk53IAOh53HbHZrvhRrQBysr-JiGRExQFldBtp0Opfljy9npWLGdh3b8Kgnj7njcuUPnvez06ABtvNcrdtYR1fY1D30C27mqyQZA_dXM0o4bYDs1Q2h7Fm_na-fgsMNa4a6oJDfGS2m5CZMfVw0ECJkUr_9vnHPRZ7ENE7JkqaAskI3wD0bBPs3Ee3UHM5hq536XRd7IlP15TdoRmJQJZ9Z3tY32-SUCFxtl56hM-eMj4fuu6R0fXy_1ab6DSrtu3SKa6X6pZDmbBChSksoeIBEB0EkH8a7xmwOMbTXmLL3KR51NBqVuVClKlCyFcNiKmowvhfrr7OCb9WKHuCxwxt6Q_gRSMYYtHL0nAdoX5-dFYedX1CwSwei2fA'
        },
        data : data
      };

      try{
        let res = await axios.request(config)
        let filteredData = res.data.data.homePages[0]
        return filteredData
      }catch(err){
        console.log(err)
      }
}