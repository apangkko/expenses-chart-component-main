fetch('./data.json')
    .then((response) => response.json())
    .then((json) => {
        let spends = [];

        json.forEach(item => {
            spends.push(item.amount);
        });

        const maxAmount = spends.reduce((a, b) => Math.max(a, b));
        const barContainer = document.querySelector(".bar__container");

        json.forEach(data => {
            const barHeight = (data.amount/maxAmount) * 9.5 ;

            const barCol = document.createElement("div");
            barCol.classList.add("bar__col");

            const barAmount = document.createElement("div");
            barAmount.classList.add("bar__amount");
            barAmount.style.bottom = `${barHeight}rem`;
            barAmount.innerHTML = `$${data.amount}`;

            const barGraphic = document.createElement("div");
            barGraphic.classList.add("bar__graphic");
            if (data.amount == maxAmount) {
                barGraphic.classList.add("bar__graphic--max");
            }
            barGraphic.style.height = `${barHeight}rem`;

            const barDay = document.createElement("p");
            barDay.classList.add("bar__day");
            barDay.innerHTML = `${data.day}`;

            barContainer.append(barCol);
            barCol.append(barAmount);
            barCol.append(barGraphic);
            barCol.append(barDay);
        });

});
