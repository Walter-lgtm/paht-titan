// Константы (Шаг 0)
const M1 = 78.11; // Бензол
const M2 = 92.14; // Толуол

function calculateFirstSteps() {
    const massBenz = parseFloat(document.getElementById('mass_benzene').value) / 100;
    const massTol = 1 - massBenz;
    const P2 = parseFloat(document.getElementById('p2_press').value) * 10; // в бары для Антуана

    // Шаг 1: Пересчет в мольные доли
    const x1 = (massBenz / M1) / (massBenz / M1 + massTol / M2);
    const x2 = 1 - x1;

    // Шаг 2: Итерационный поиск T_кип (упрощенно для первого теста)
    // В полной версии здесь будет цикл по уравнению Антуана
    let t_nk = 92.4; // Предварительный расчет при 0.11 МПа

    // Шаг 3: Выбор пара
    let t_steam = Math.round(t_nk + 25);
    let p_steam = 0.2; // МПа (ориентировочно для 117-120 градусов)

    document.getElementById('output').innerHTML = `
        <p><b>Мольная доля бензола:</b> ${x1.toFixed(3)}</p>
        <p><b>Температура начала кипения:</b> ${t_nk} °C</p>
        <p><b>Выбранная температура пара:</b> ${t_steam} °C</p>
        <p><b>Давление греющего пара:</b> ${p_steam} МПа</p>
    `;
}
