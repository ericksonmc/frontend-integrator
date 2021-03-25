import Swal from 'sweetalert2';

export function showError(text) {
    Swal.fire({
        title: text,
        icon: 'error',
        heightAuto: false,
    });
}
