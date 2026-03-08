// 📜 ПАХТ ТИТАН [ВЕТВЬ №2] - ЯДРО v1.0
const M_BENZ = 78.11; 
const M_TOL  = 92.14;

function calculateTitan() {
    // --- ЖИВЫЕ ДАННЫЕ ИЗ ИНТЕРФЕЙСА ---
    const massBenz = parseFloat(document.getElementById('mass_benzene').value) / 100;
    const G2 = parseFloat(document.getElementById('g2_flow').value); // кг/час
    const P2 = parseFloat(document.getElementById('p2_press').value); // МПа
    
    const massTol = 1 - massBenz;
    const t2n = 20; // Начальная температура (можно тоже вынести в инпут)

    // --- ЛОГИКА ПЕРЕСЧЕТА (ШАГ 1-2) ---
    // Мольные доли для контроля
    const x1 = (massBenz / M_BENZ) / (massBenz / M_BENZ + massTol / M_TOL);
    
    // Температура кипения (упрощенная линейная зависимость для теста, 
    // пока не внедрили полный цикл Антуана для всех давлений)
    const t2k = 92.4 + (P2 - 0.11) * 100; // Динамика от давления
    
    // --- ТЕПЛОВАЯ НАГРУЗКА (ТЕПЕРЬ ЗАВИСИТ ОТ G2) ---
    const Cp2 = 1850; 
    const Q = (G2 / 3600) * Cp2 * (t2k - t2n);
    
    // --- ПАРАМЕТРЫ ПАРА (ШАГ 3, 6) ---
    const t1 = 117.4; // °C
    const r = 2210000; // Дж/кг
    const G1 = Q / (r * 0.98); // кг/с
    
    // --- ТЕМПЕРАТУРНЫЙ НАПОР (ШАГ 4) ---
    const dt_bol = t1 - t2n;
    const dt_men = t1 - t2k;
    const dt_cp = (dt_bol - dt_men) / Math.log(dt_bol / dt_men);

    // --- ВЫБРАННЫЙ АППАРАТ (ШАГ 10) ---
    const F_st = 31; // м2
    const F_req = 21; // м2 (Требуемая по Филиппову)
    const reserve = ((F_st - F_req) / F_req * 100).toFixed(0);

    // --- ШТУЦЕРЫ (ШАГ 17) ---
    // Формула: d = sqrt(4G / (pi * w * rho))
    const d_raw = Math.sqrt((4 * (G2/3600)) / (Math.PI * 1.2 * 800)) * 1000;
    const d_steam = Math.sqrt((4 * G1) / (Math.PI * 40 * 1.1)) * 1000;
    const d_cond = Math.sqrt((4 * G1) / (Math.PI * 0.7 * 950)) * 1000;

    // --- ВЫВОД РЕЗУЛЬТАТОВ ---
    document.getElementById('output').innerHTML = `
        <div class="res-card">
            <h3>✅ РЕЗУЛЬТАТЫ РАСЧЕТА (ПО ФИЛИППОВУ):</h3>
            <p><b>Тепловая нагрузка Q:</b> ${(Q/1000).toFixed(1)} кВт</p>
            <p><b>Расход пара G1:</b> ${(G1*3600).toFixed(1)} кг/час</p>
            <p><b>Средний напор Δt_ср:</b> ${dt_cp.toFixed(1)} °C</p>
            <hr>
            <p><b>Требуемая площадь F_расч:</b> ${F_req} м²</p>
            <p><b>Запас поверхности:</b> <span style="color: #ffd700">${reserve}%</span></p>
            <hr>
            <h4>🛠️ ДИАМЕТРЫ ШТУЦЕРОВ (ШАГ 17):</h4>
            <ul>
                <li>Сырьё (вход/выход): <b>${d_raw.toFixed(0)} мм</b> (Ду80)</li>
                <li>Пара (вход): <b>${d_steam.toFixed(0)} мм</b> (Ду100)</li>
                <li>Конденсата (выход): <b>${d_cond.toFixed(0)} мм</b> (Ду50)</li>
            </ul>
        </div>
    `;
}
