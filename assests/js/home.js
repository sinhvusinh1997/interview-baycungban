const btnNavBar = document.querySelector(".nav-mobile-icon"); // lấy icon bars trên đt
const navMobile = document.querySelector(".nav-mobile"); // chọn nav trên đt
const getInputDate = document.querySelectorAll("[data-input-date]"); // lấy input fields ngày
const btnSearchFlight = document.querySelector("[data-btn-search-flight]"); // Chọn button search


// Foramt ngày => trả về string để gán vào DOM
const formatDate = (valueAsDate) => {
    const dayOfWeek = valueAsDate.split(" ")[0];
    const day = valueAsDate.split(" ")[2];
    let month = valueAsDate.split(" ")[1];
    const year = valueAsDate.split(" ")[3];

    month = month < 10 ? month.slice(1, 2) : month;

    return `${dayOfWeek}, ${day} ${month}, ${year}`;
}

// Khởi tạo này hiện tại trong lần đăng nhập đầu tiên.
(function () {
    const curDate = new Date();
    const dayOfWeek = new Date().toLocaleString(
        'default', { weekday: 'short' }
    );
    const curMonth = curDate.toLocaleString(
        'default', { month: 'short' }
    );

    // Format và hiển thị ra giao diện
    const dateOri = formatDate(curDate.toString());


    const showDate = document.querySelectorAll(".show-date");
    showDate.forEach(item => {
        item.innerHTML = dateOri;
    })

    const curMonthNum = curDate.getMonth() < 10 ? `0${curDate.getMonth() + 1}` : curDate.getMonth() + 1;
    const curDateNum = curDate.getDate() < 10 ? `0${curDate.getDate()}` : curDate.getDate();

    // Gán dữ liệu ngày đi và ngày về bằng giá trị hiện tại
    getInputDate.forEach(item => item.value = `${curDate.getFullYear()}-${curMonthNum}-${curDateNum}`);

})();

// 
btnNavBar.addEventListener("click", () => {
    const navClass = navMobile.classList;
    navClass.contains("active") ? navClass.remove("active") : navClass.add("active");
});


// Tạo dữ liệu để kiểm tra
const createDataFlight = (getAllForm) => {

    const flightType = getAllForm[0].querySelector("[type='radio']:checked");
    const amountPeople = getAllForm[1].querySelector("select");
    const seatHierarchy = getAllForm[2].querySelector("select");
    const dateDeparture = getAllForm[4].querySelectorAll("input")[0];
    const dateReturn = getAllForm[4].querySelectorAll("input")[1];

    return {
        flightType: flightType === null ? "incorrect" : flightType.value,
        amountPeople: amountPeople === null ? "incorrect" : amountPeople.value,
        seatHierarchy: seatHierarchy === null ? "incorrect" : seatHierarchy.value,
        flightRoute: {
            originPlace: "DN",
            destination: "HCM"
        },
        flightDate: {
            departure: dateDeparture === "" ? "incorrect" : formatDate(dateDeparture.valueAsDate.toString()),
            return: dateReturn === "" ? "incorrect" : formatDate(dateReturn.valueAsDate.toString()),
        }
    }
}

const checkData = (resData) => {
    let errorList = [];

    for (const key in resData) {
        if (resData[key] == "incorrect") {
            errorList.push(`${key}: không hợp lệ`);
        }
        // Kiểm tra điểm đến và điểm xuất phát => chưa làm xong phần này
        if (typeof resData[key] === "object" && key === "flightRoute")
            for (const keyChild in resData[key])
                if (resData[key][keyChild] === null || resData[key][keyChild] === "")
                    errorList.push(`${keyChild} không hợp lệ!`);

        // Kiểm tra ngày
        if (typeof resData[key] === "object" && key === "flightDate")
            if (Date.parse(resData[key]["departure"]) > Date.parse(resData[key]["return"]))
                errorList.push(`Ngày đi không sau ngày về!`);
    }

    return errorList;
}

getInputDate.forEach(inputDate => {
    inputDate.addEventListener("change", e => {
        const value = e.target.valueAsDate.toString();

        e.target.closest(".date-wrap").querySelector(".show-date").innerHTML = formatDate(value);
    });
})


btnSearchFlight.addEventListener("click", (e) => {
    const getAllForm = document.querySelectorAll("[data-form]");
    const resData = createDataFlight(getAllForm);

    console.log(resData)

    const errorList = checkData(resData);

    if (errorList.length !== 0) {
        alert(`
        Vui lòng kiểm tra lại thông tin đã điền!
        Truy cập console để xem chi tiết lỗi :)) `);

        console.log(`date have incorrect: ${errorList}`);
    } else {
        alert(`Thông tin đã đúng, đang tìm chuyến bay ... `);
        localStorage.setItem("data", JSON.stringify(resData));
        console.log(resData)
        location.href = "../list.html";
    }

})