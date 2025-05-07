const API_URL = 'https://13.219.246.26:80/api/devices';
const tablaBody = document.getElementById('tablaBody');
const statusInfo = document.getElementById('statusInfo');

async function obtenerDatos() {
    try {
        const response = await fetch(API_URL);
        console.log('Respuesta cruda:', response);  // Esto te muestra la respuesta cruda

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();  // Convertimos la respuesta en JSON
        console.log('Datos recibidos:', data);  // Esto te muestra la estructura de los datos

        tablaBody.innerHTML = '';

        if (Array.isArray(data.devices)) {
            // Mostrar el status del primer dispositivo
            if (data.devices.length > 0) {
                statusInfo.innerHTML = `<strong>Status del primer dispositivo:</strong> <span class="status-text">${data.devices[0].status}</span>`;
            } else {
                statusInfo.innerHTML = `<span class="text-muted">No hay dispositivos disponibles</span>`;
            }

            data.devices.forEach(item => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.ip}</td>
                    <td>${item.status}</td>
                    <td>${new Date(item.date).toLocaleString()}</td>
                `;
                tablaBody.appendChild(fila);
            });
        } else {
            statusInfo.innerHTML = '';
            tablaBody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-danger">No se pudo procesar los datos correctamente</td>
                </tr>
            `;
        }

    } catch (error) {
        console.error('Error al cargar los datos:', error);
        statusInfo.innerHTML = '';
        tablaBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-danger">
                    ❌ No se pudieron obtener los datos<br>
                    ${error.message}
                </td>
            </tr>
        `;
    }
}

// Refrescar cada 2 segundos
setInterval(obtenerDatos, 2000);

// Llamar una vez al inicio
obtenerDatos();
