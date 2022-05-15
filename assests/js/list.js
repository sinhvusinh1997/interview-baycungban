const collapseMore = document.querySelectorAll("[data-collapse-btn]");
const departureTime = document.querySelector(".departure-time");
const returnTime = document.querySelector(".return-time");
const getBtnFlightDetail = document.querySelectorAll(".flight-detail");
const getBtnFareInfo = document.querySelectorAll(".fareinfo");
const getFlightInfo = document.querySelectorAll("[data-flight-info]");


departureTime.addEventListener("click", e => {
    const parentEl = e.target.closest(".collapse-select");

    parentEl.querySelector(".more").classList.toggle("active");
    parentEl.querySelector(".id-flight").classList.toggle("active");

})

returnTime.addEventListener("click", e => {
    const parentEl = e.target.closest(".collapse-select");

    parentEl.querySelector(".more").classList.toggle("active");
    parentEl.querySelector(".id-flight").classList.toggle("active");

});


getBtnFlightDetail.forEach(item => {
    item.addEventListener("click", e => {
        e.target.classList.toggle("active");

        const parentEl = e.target.closest(".flight-item");

        parentEl.querySelector(".more-fareInfo-detail").classList.remove("active");
        parentEl.querySelector(".btn-show-more .fareinfo").classList.remove("active");


        parentEl.querySelector(".more-flight-detail").classList.toggle("active");
    });

})

getBtnFareInfo.forEach(item => {
    item.addEventListener("click", e => {
        e.target.classList.toggle("active");
        const parentEl = e.target.closest(".flight-item");


        parentEl.querySelector(".more-flight-detail").classList.remove("active");
        parentEl.querySelector(".btn-show-more .flight-detail").classList.remove("active");


        parentEl.querySelector(".more-fareInfo-detail").classList.toggle("active");
    });
});

window.addEventListener("load", e => {

    const data = JSON.parse(localStorage.getItem("data"));

    getFlightInfo.forEach(item => {

        const dataset = item.dataset.flightInfo;
        // console.log(dataset)

        switch (dataset) {
            case "amountPeople":
                item.innerHTML = data[dataset];
                break;
            case "flightType":
                item.innerHTML = data[dataset];

                break;
            case "seatHierarchy":
                item.innerHTML = data[dataset];

                break;
            case "departure":
                item.innerHTML = data["flightDate"][dataset];
                break;

            case "return":
                item.innerHTML = data["flightDate"][dataset];
                break;
            default:
                break;
        }


    })
})

