// 숫자 입력값 가져오기
function getValue(id) {

    const element = document.getElementById(id);

    const value = parseFloat(element.value);

    return isNaN(value) ? 0 : value;
}



// 등급 선택지 변경
function updateGradeOptions() {

    const species = document.getElementById("species").value;

    const grade = document.getElementById("grade");


    // 기존 옵션 삭제
    grade.innerHTML = "";


    if (species === "소") {

        const grades = [
            "1++",
            "1+",
            "1",
            "2",
            "3",
            "등외"
        ];


        grades.forEach(function(item) {

            const option = document.createElement("option");

            option.value = item;

            option.textContent = item;

            grade.appendChild(option);

        });

    } else {

        const grades = [
            "1+",
            "1",
            "2",
            "등외"
        ];


        grades.forEach(function(item) {

            const option = document.createElement("option");

            option.value = item;

            option.textContent = item;

            grade.appendChild(option);

        });

    }

}



// 수율 계산
function calculate() {


    // -------------------------
    // 원육 정보
    // -------------------------

    const rawWeight =
        getValue("rawWeight");


    const purchasePrice =
        getValue("purchasePrice");


    // -------------------------
    // 정육 부위
    // -------------------------

    const sirloin =
        getValue("sirloin");


    const tenderloin =
        getValue("tenderloin");


    const striploin =
        getValue("striploin");


    const ribs =
        getValue("ribs");


    const round =
        getValue("round");


    const rump =
        getValue("rump");


    const trimmings =
        getValue("trimmings");


    // 정육 총중량

    const totalMeat =
        sirloin +
        tenderloin +
        striploin +
        ribs +
        round +
        rump +
        trimmings;



    // -------------------------
    // 부산물
    // -------------------------

    const fat =
        getValue("fat");


    const bone =
        getValue("bone");


    const byproductWeight =
        fat + bone;



    // -------------------------
    // 수율
    // -------------------------

    let yieldRate = 0;


    if (rawWeight > 0) {

        yieldRate =
            (totalMeat / rawWeight) * 100;

    }



    // -------------------------
    // 미산출량
    // -------------------------

    let unaccountedWeight =
        rawWeight -
        totalMeat -
        byproductWeight;


    // 아주 작은 소수점 오차 제거

    if (
        unaccountedWeight > -0.05 &&
        unaccountedWeight < 0.05
    ) {

        unaccountedWeight = 0;

    }



    // -------------------------
    // 정육 kg당 원가
    // -------------------------

    let meatCost = 0;


    if (totalMeat > 0) {

        meatCost =
            purchasePrice / totalMeat;

    }



    // -------------------------
    // 화면 출력
    // -------------------------

    document.getElementById("totalMeat")
        .textContent =
        totalMeat.toFixed(1);


    document.getElementById("yieldRate")
        .textContent =
        yieldRate.toFixed(1);


    document.getElementById("byproductWeight")
        .textContent =
        byproductWeight.toFixed(1);


    document.getElementById("unaccountedWeight")
        .textContent =
        unaccountedWeight.toFixed(1);


    document.getElementById("meatCost")
        .textContent =
        Math.round(meatCost).toLocaleString();



    // -------------------------
    // 경고
    // -------------------------

    const warning =
        document.getElementById("warning");


    if (unaccountedWeight < 0) {

        warning.style.display = "block";

        warning.textContent =
            "⚠️ 입력한 중량이 원육 중량을 초과했습니다. 발골 중량을 확인해주세요.";

    } else {

        warning.style.display = "none";

        warning.textContent = "";

    }

}



// 페이지가 처음 열릴 때
updateGradeOptions();

calculate();