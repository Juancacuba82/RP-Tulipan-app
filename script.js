const i18n = {
    es: {
        langBtn: "🇺🇸 EN",
        heroTit: "Cotiza tu Contenedor Al Instante",
        heroSub: "Encuentra los precios estimados de alquiler o venta, con entrega directa en tu ubicación.",
        modeLabel: "¿Qué necesitas?",
        modeRent: "Alquilar (Mensual)",
        modeBuy: "Comprar",
        condLabel: "Estado del Contenedor",
        condNew: "Nuevo",
        condUsed: "Usado",
        locLabel: "Ubicación de Retiro",
        locBanner: "Para asegurar el mejor precio, seleccione la ubicación más cercana a su dirección.",
        typeLabel: "Tamaño del Contenedor",
        type20: "20' Estándar",
        type40st: "40' Estándar",
        type40hc: "40' High Cube (HC)",
        type45hc: "45' High Cube (HC)",
        useLabel: "Tipo de Uso",
        useNational: "WWT (storage)",
        useExport: "sea worthy certificate (shipping) +$250",
        zipLabel: "Código Postal de Entrega (US)",
        zipHint: "Ingresa el Zip Code donde se entregará el contenedor.",
        btnCalc: "Obtener Presupuesto Estimado",
        calcLoading: "Calculando...",
        errZip: "Código postal inválido o no encontrado.",
        resTit: "Resumen de Cotización",
        resCont: "Costo Base del Contenedor",
        resTrans: "Costo de Transporte (Envío)",
        resTransRent: "Costo de Transporte (Envío y Recogida)",
        resExportFee: "Cargo por Exportación (SOC)",
        resTot: "Total Estimado",
        distLabel: "Distancia estimada:",
        milesUnit: "millas",
        disclaim: "* Los precios mostrados son estimaciones basadas en nuestras tarifas base. La tarifa final será confirmada formalmente.",
        waBtn: "📲 Obtener confirmación del precio",
        waMsg: (mode, loc, type, useTypeStr, zip, miles, base, transport, exportFee, total) =>
            `Hola! Me interesa la siguiente cotización:\n` +
            `• Modalidad: ${mode}\n` +
            `• Tipo de uso: ${useTypeStr}\n` +
            `• Contenedor: ${type}\n` +
            `• Retiro desde: ${loc}\n` +
            `• Entrega en ZIP: ${zip} (~${miles} millas)\n` +
            `• Costo base del contenedor: ${base}\n` +
            `• Costo de transporte: ${transport}\n` +
            (exportFee ? `• Cargo por exportación: ${exportFee}\n` : ``) +
            `• *TOTAL ESTIMADO: ${total}*\n\n` +
            `¿Pueden confirmarme esta cotización? Gracias!`
    },
    en: {
        langBtn: "🇪🇸 ES",
        heroTit: "Instant Container Quote",
        heroSub: "Get estimated pricing for rent or purchase, with direct delivery to your location.",
        modeLabel: "What do you need?",
        modeRent: "Rent (Monthly)",
        modeBuy: "Buy",
        condLabel: "Container Condition",
        condNew: "New",
        condUsed: "Used",
        locLabel: "Pickup Location",
        locBanner: "To secure the best pricing, please select the location nearest to your address.",
        typeLabel: "Container Size",
        type20: "20' Standard",
        type40st: "40' Standard",
        type40hc: "40' High Cube (HC)",
        type45hc: "45' High Cube (HC)",
        useLabel: "Type of Use",
        useNational: "WWT (storage)",
        useExport: "sea worthy certificate (shipping)",
        zipLabel: "Delivery Zip Code (US)",
        zipHint: "Enter the Zip Code where the container will be delivered.",
        btnCalc: "Get Estimated Quote",
        calcLoading: "Calculating...",
        errZip: "Invalid or not found US zip code.",
        resTit: "Quote Summary",
        resCont: "Base Container Cost",
        resTrans: "Transport Cost (Delivery)",
        resTransRent: "Transport Cost (Delivery & Pickup)",
        resExportFee: "Export Fee (SOC)",
        resTot: "Estimated Total",
        distLabel: "Estimated distance:",
        milesUnit: "miles",
        disclaim: "* Prices shown are estimates based on our standard rates. The exact rate will be formally confirmed.",
        waBtn: "📲 Get Price Confirmation",
        waMsg: (mode, loc, type, useTypeStr, zip, miles, base, transport, exportFee, total) =>
            `Hello! I'm interested in the following quote:\n` +
            `• Mode: ${mode}\n` +
            `• Use Type: ${useTypeStr}\n` +
            `• Container: ${type}\n` +
            `• Pickup from: ${loc}\n` +
            `• Delivery ZIP: ${zip} (~${miles} miles)\n` +
            `• Base container cost: ${base}\n` +
            `• Transport cost: ${transport}\n` +
            (exportFee ? `• Export fee: ${exportFee}\n` : ``) +
            `• *ESTIMATED TOTAL: ${total}*\n\n` +
            `Can you confirm this quote? Thank you!`
    }
};

let currentLang = 'en';

// Precios Reales Proveídos
const PRICING = {
    // Precios de contenedores USADOS (compra)
    buy_used: {
        miami: { "20": 1300, "40st": 1600, "40hc": 1650, "45hc": 1850 },
        tampa: { "20": 1600, "40st": 1950, "40hc": 2000, "45hc": 2200 },
        titusville: { "20": 1700, "40st": 1950, "40hc": 2000, "45hc": 2100 },
        savannah: { "20": 1250, "40st": 1600, "40hc": 1650, "45hc": 1850 },
        jacksonville: { "20": 1600, "40st": 1850, "40hc": 1900 },
        atlanta: { "20": 1600, "40st": 1900, "40hc": 1950 }
    },
    // Precios de contenedores NUEVOS (compra) — solo 20' y 40', sin Titusville
    buy_new: {
        miami: { "20": 2350, "40hc": 3350 },
        tampa: { "20": 2750, "40hc": 3750 },
        jacksonville: { "20": 2950, "40hc": 3950 },
        savannah: { "20": 2450, "40hc": 3450 }
    },
    // Precios de alquiler de contenedores USADOS
    rent_used: {
        miami: { "20": 150, "40st": 225, "40hc": 250, "45hc": 300 },
        tampa: { "20": 150, "40st": 225, "40hc": 250, "45hc": 300 },
        titusville: { "20": 150, "40st": 225, "40hc": 250, "45hc": 300 },
        savannah: { "20": 150, "40st": 225, "40hc": 250, "45hc": 300 },
        jacksonville: { "20": 150, "40st": 225, "40hc": 250 },
        atlanta: { "20": 150, "40st": 225, "40hc": 250 }
    },
    // Precios de alquiler de contenedores NUEVOS
    rent_new: {
        miami: { "20": 225, "40hc": 350 },
        tampa: { "20": 225, "40hc": 350 },
        titusville: { "20": 225, "40hc": 350 },
        jacksonville: { "20": 225, "40hc": 350 },
        savannah: { "20": 225, "40hc": 350 },
        atlanta: { "20": 225, "40hc": 350 }
    }
};

// Ubicaciones donde NO hay contenedores nuevos disponibles

const LOCATIONS = {
    miami: { lat: 25.8229, lon: -80.4005 },       // 33178
    tampa: { lat: 27.9398, lon: -82.3768 },       // 33619
    titusville: { lat: 28.5830, lon: -80.8197 },  // 32780
    savannah: { lat: 32.1281, lon: -81.2050 },    // 31408
    jacksonville: { lat: 30.3944, lon: -81.5619 }, // 32218
    atlanta: { lat: 33.6393, lon: -84.3396 }      // 30288
};

// Fórmula Haversine modificada (+ 20% para aproximar rutas terrestres)
function getDistanceInMiles(lat1, lon1, lat2, lon2) {
    const R = 3958.8; // Radio de la Tierra en millas
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d * 1.25; // 25% extra aproximado por rutas de carretera en USA
}

function calculateTransport(miles) {
    if (miles <= 40) return 350;
    if (miles <= 70) return 400;
    if (miles <= 100) return 500;
    return miles * 5;
}

// Referencias del DOM
const els = {
    langBtn: document.getElementById('lang-toggle'),
    heroTit: document.getElementById('t-hero-title'),
    heroSub: document.getElementById('t-hero-sub'),
    modeLabel: document.getElementById('t-label-mode'),
    modeRent: document.getElementById('t-mode-rent'),
    modeBuy: document.getElementById('t-mode-buy'),
    condGroup: document.getElementById('condition-group'),
    condLabel: document.getElementById('t-label-condition'),
    condNew: document.getElementById('t-cond-new'),
    condUsed: document.getElementById('t-cond-used'),
    locLabel: document.getElementById('t-label-location'),
    locBanner: document.getElementById('t-banner-location'),
    typeLabel: document.getElementById('t-label-type'),
    useLabel: document.getElementById('t-label-use'),
    useNational: document.getElementById('t-use-national'),
    useExport: document.getElementById('t-use-export'),
    zipLabel: document.getElementById('t-label-zip'),
    zipHint: document.getElementById('t-hint-zip'),
    zipError: document.getElementById('zip-error'),
    btnCalc: document.getElementById('t-btn-calc'),
    resTit: document.getElementById('t-res-title'),
    resCont: document.getElementById('t-res-container'),
    resTrans: document.getElementById('t-res-transport'),
    resExportFee: document.getElementById('t-res-export-fee'),
    resTot: document.getElementById('t-res-total'),
    resMilesLab: document.getElementById('t-res-miles'),
    valMiles: document.getElementById('val-miles'),
    disclaim: document.getElementById('t-disclaimer')
};

function setLanguage(lang) {
    const d = i18n[lang];
    els.langBtn.innerHTML = d.langBtn;
    els.heroTit.innerText = d.heroTit;
    els.heroSub.innerText = d.heroSub;
    els.modeLabel.innerText = d.modeLabel;
    els.modeRent.innerText = d.modeRent;
    els.modeBuy.innerText = d.modeBuy;
    els.condLabel.innerText = d.condLabel;
    els.condNew.innerText = d.condNew;
    els.condUsed.innerText = d.condUsed;
    els.locLabel.innerText = d.locLabel;
    els.locBanner.innerText = d.locBanner;
    els.typeLabel.innerText = d.typeLabel;

    if (els.useLabel) els.useLabel.innerText = d.useLabel;
    if (els.useNational) els.useNational.innerText = d.useNational;
    if (els.useExport) els.useExport.innerText = d.useExport;

    // Select options logic
    const tc = document.getElementById('container-type');
    tc.options[0].text = d.type20;
    tc.options[1].text = d.type40st;
    tc.options[2].text = d.type40hc;
    tc.options[3].text = d.type45hc;

    els.zipLabel.innerText = d.zipLabel;
    els.zipHint.innerText = d.zipHint;
    els.btnCalc.innerText = d.btnCalc;
    els.resTit.innerText = d.resTit;
    els.resCont.innerText = d.resCont;
    // resTrans se determinará en el cálculo según el modo seleccionado
    if (els.resExportFee) els.resExportFee.innerText = d.resExportFee;
    els.resTot.innerText = d.resTot;
    els.resMilesLab.innerText = d.distLabel;
    els.disclaim.innerText = d.disclaim;

    els.zipError.innerText = d.errZip; // Prepare error text just in case
}

els.langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    setLanguage(currentLang);

    const resBox = document.getElementById('result-box');
    if (!resBox.classList.contains('hidden')) {
        resBox.classList.add('hidden');
    }
});

function updateContainerOptions() {
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const loc = document.getElementById('location').value;
    const tc = document.getElementById('container-type');
    const condition = document.querySelector('input[name="condition"]:checked').value;

    // Mostrar u ocultar grupo de condición (nuevo/usado) (ahora siempre visible para ambos)
    const useTypeGroup = document.getElementById('use-type-group');
    els.condGroup.classList.remove('hidden');

    if (mode === 'buy') {
        if (useTypeGroup) useTypeGroup.classList.remove('hidden');
    } else {
        // En alquiler ocultamos tipo de uso y reseteamos a use-national
        if (useTypeGroup) useTypeGroup.classList.add('hidden');
        document.getElementById('use-type').value = 'national';
    }

    const isNew = condition === 'new';

    // Ocultar ubicaciones que no tienen contenedores nuevos
    const locSelect = document.getElementById('location');
    let locationChanged = false;

    for (let i = 0; i < locSelect.options.length; i++) {
        const optionVal = locSelect.options[i].value;
        let shouldHide = false;

        if (isNew) {
            if (optionVal === 'titusville' && mode === 'buy') {
                shouldHide = true;
            } else if (optionVal === 'atlanta' && mode === 'buy') {
                shouldHide = true;
            }
        }

        // Restringir renta solo a Jacksonville, Titusville, Tampa y Miami (Ocultar Savannah y Atlanta)
        if (mode === 'rent') {
            if (optionVal === 'savannah' || optionVal === 'atlanta') {
                shouldHide = true;
            }
        }

        locSelect.options[i].style.display = shouldHide ? 'none' : '';

        if (shouldHide && loc === optionVal) {
            // Seleccionar Miami por defecto si el usuario estaba en una ubicación no válida
            locSelect.value = 'miami';
            locationChanged = true;
        }
    }

    // Actualizar loc en caso de que lo hayamos cambiado para que la validación de contenedores HC use el correcto
    const currentLoc = locationChanged ? 'miami' : loc;

    // Si es contenedor NUEVO: solo 20' y 40', sin 45'.
    for (let i = 0; i < tc.options.length; i++) {
        const val = tc.options[i].value;
        if (val === '45hc') {
            const hide45 = currentLoc === 'tampa' || currentLoc === 'titusville' || currentLoc === 'jacksonville' || currentLoc === 'atlanta' || isNew;
            tc.options[i].style.display = hide45 ? 'none' : '';
            if (hide45 && tc.value === '45hc') tc.value = '40hc';
        }
        if (val === '40st') {
            const hide40st = isNew;
            tc.options[i].style.display = hide40st ? 'none' : '';
            if (hide40st && tc.value === '40st') tc.value = '20';
        }
    }

}

document.getElementById('location').addEventListener('change', updateContainerOptions);
document.querySelectorAll('input[name="mode"]').forEach(radio => {
    radio.addEventListener('change', updateContainerOptions);
});
document.querySelectorAll('input[name="condition"]').forEach(radio => {
    radio.addEventListener('change', updateContainerOptions);
});

// Inicializar estado de opciones
setLanguage(currentLang);
updateContainerOptions();

// Lógica de cálculo
document.getElementById('quote-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const d = i18n[currentLang];
    els.zipError.classList.add('hidden');
    els.zipError.innerText = '';
    els.btnCalc.disabled = true;
    els.btnCalc.innerText = d.calcLoading;

    const mode = document.querySelector('input[name="mode"]:checked').value;
    const loc = document.getElementById('location').value;
    const type = document.getElementById('container-type').value;
    const useType = document.getElementById('use-type').value;
    const zip = document.getElementById('zipcode').value;

    let distance = 0;

    try {
        const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
        if (!response.ok) throw new Error("Zip not found");
        const data = await response.json();

        const destLat = parseFloat(data.places[0].latitude);
        const destLon = parseFloat(data.places[0].longitude);
        const origin = LOCATIONS[loc];

        // 1. Obtener la ruta de manejo real usando la API pública OSRM (Open Source Routing Machine)
        try {
            const osrmRes = await fetch(`https://router.project-osrm.org/route/v1/driving/${origin.lon},${origin.lat};${destLon},${destLat}?overview=false`);
            if (!osrmRes.ok) throw new Error("OSRM failed");
            const osrmData = await osrmRes.json();

            if (osrmData.routes && osrmData.routes.length > 0) {
                // La distancia viene en metros, la convertimos a millas reales de conducción
                distance = osrmData.routes[0].distance / 1609.344;
            } else {
                throw new Error("No route found");
            }
        } catch (e) {
            // FALLBACK: Si OSRM falla, usamos la fórmula matemática original ajustada
            distance = getDistanceInMiles(origin.lat, origin.lon, destLat, destLon);
        }

    } catch (err) {
        els.btnCalc.disabled = false;
        els.btnCalc.innerText = d.btnCalc;
        els.zipError.innerText = d.errZip;
        els.zipError.classList.remove('hidden');
        return;
    }

    els.btnCalc.disabled = false;
    els.btnCalc.innerText = d.btnCalc;

    // Remove redundant selector by reusing the let or just not redeclaring in block
    const condVal = document.querySelector('input[name="condition"]:checked').value;
    const pricingKey = `${mode}_${condVal}`;
    const baseCost = PRICING[pricingKey][loc][type];

    // Si alquilan, se cobra viaje de ida y viaje de recogida
    let transportCost = calculateTransport(distance);
    if (mode === 'rent') {
        transportCost = transportCost * 2;
        els.resTrans.innerText = d.resTransRent;
    } else {
        els.resTrans.innerText = d.resTrans;
    }

    // Formateador de moneda (USD)
    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    let exportFeeValue = 0;
    const exportFeeRow = document.getElementById('export-fee-row');
    if (useType === 'export' && mode === 'buy') {
        exportFeeValue = 250;
        exportFeeRow.style.setProperty('display', 'flex', 'important');
        document.getElementById('val-export-fee').innerText = '+' + formatCurrency(exportFeeValue);
    } else {
        exportFeeRow.style.setProperty('display', 'none', 'important');
    }

    const totalCost = baseCost + transportCost + exportFeeValue;

    const finalTotal = totalCost;

    let mesSuffix = mode === 'rent' ? (currentLang === 'es' ? '/mes' : '/month') : '';

    document.getElementById('val-base').innerText = formatCurrency(baseCost) + mesSuffix;
    document.getElementById('val-transport').innerText = formatCurrency(transportCost);
    els.valMiles.innerText = `${Math.round(distance)} ${d.milesUnit}`;

    let initialTotalText = mode === 'rent' ? (currentLang === 'es' ? ' (1er mes)' : ' (1st month)') : '';
    document.getElementById('val-total').innerText = formatCurrency(finalTotal) + initialTotalText;

    els.resCont.innerText = d.resCont;

    const resBox = document.getElementById('result-box');
    resBox.classList.remove('hidden');

    // Mover la pantalla hacia los resultados
    resBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Pequeño truco para forzar re-animación
    resBox.style.animation = 'none';
    resBox.offsetHeight; /* trigger reflow */
    resBox.style.animation = null;

    // --- Botón de WhatsApp ---
    // ⚠️ Reemplaza el número de abajo con el de tu WhatsApp de negocios (con código de país, sin +)
    const WHATSAPP_NUMBER = '+17867684409';

    const locNames = {
        miami: 'Miami (33178)', tampa: 'Tampa (33619)',
        titusville: 'Titusville (32780)', savannah: 'Savannah (31408)',
        jacksonville: 'Jacksonville (32218)', atlanta: 'Atlanta (30288)'
    };
    const typeNames = {
        '20': "20' Estándar / Standard",
        '40st': "40' Estándar / Standard",
        '40hc': "40' High Cube (HC)",
        '45hc': "45' High Cube (HC)"
    };
    const condVal2 = document.querySelector('input[name="condition"]:checked').value;
    const condDisplay = condVal2 === 'new'
        ? (currentLang === 'es' ? 'Nuevo' : 'New')
        : (currentLang === 'es' ? 'Usado' : 'Used');
    const modeDisplay = mode === 'rent'
        ? (currentLang === 'es' ? 'Alquiler (Mensual)' : 'Rent (Monthly)')
        : (currentLang === 'es' ? `Compra (${condDisplay})` : `Purchase (${condDisplay})`);

    const useTypeDisplay = useType === 'export'
        ? 'sea worthy certificate (shipping)'
        : 'WWT (storage)';

    const exportFeeFormatted = exportFeeValue > 0 ? formatCurrency(exportFeeValue) : null;

    const totalDisplay = formatCurrency(finalTotal) + (mode === 'rent' ? (currentLang === 'es' ? ' (1er mes)' : ' (1st month)') : '');

    const waText = d.waMsg(
        modeDisplay,
        locNames[loc],
        typeNames[type],
        useTypeDisplay,
        zip,
        Math.round(distance),
        formatCurrency(baseCost) + (mode === 'rent' ? (currentLang === 'es' ? '/mes' : '/month') : ''),
        formatCurrency(transportCost),
        totalDisplay
    );

    const waBtn = document.getElementById('wa-btn');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        // En móviles, abre la app de WhatsApp directamente
        waBtn.href = `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(waText)}`;
    } else {
        // En computadora, abre WhatsApp Web directamente
        waBtn.href = `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(waText)}`;
    }

    waBtn.innerText = d.waBtn;
    waBtn.classList.remove('hidden');
});
