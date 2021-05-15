import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MONTHS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre'
]

export const defaultCellStyles = {
  padding: "5px 8px",
  fontSize: "14px",
  whiteSpace: 'nowrap'
}

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
}

export const isEmpty = str => {
  return (!str || 0 === str.length);
}

/**
 * JavaScript equivalent to PHP's empty
 *
 * @param mixed mixed_var
 *
 * @returns boolean
 */
 export const empty = ( mixed_var ) => {
  //   example 1: empty(null);
  //   returns 1: true
  //   example 2: empty(undefined);
  //   returns 2: true
  //   example 3: empty([]);
  //   returns 3: true
  //   example 4: empty({});
  //   returns 4: true
  //   example 5: empty({'aFunc' : function () { alert('humpty'); } });
  //   returns 5: false

  let undef, key, i, len;
  let emptyValues = [undef, null, false, 0, '', '0', '0.0', '0.00', '0.000', '0.0000', '0.00000', '0.000000'];

  for (i = 0, len = emptyValues.length; i < len; i++)
  {
    if (mixed_var === emptyValues[i])
	{
      return true;
    }
  }

  if (typeof mixed_var === 'object')
  {
    for (key in mixed_var)
    {
      // TODO: should we check for own properties only?
      //if (mixed_var.hasOwnProperty(key)) {
      return false;
      //}
    }

    return true;
  }

  return false;
}

export const removeEmptyKey = obj => {
  Object.keys(obj).forEach(key => obj[key] == null && delete obj[key]);
};

export const formatShortDate = date => {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export const formatLongDate = date => {
  const d = new Date(date)
  d.setMinutes(d.getMinutes() + d.getTimezoneOffset())

  const monthName = MONTHS[d.getMonth()]
  let day = '' + d.getDate()
  if (day.length < 2) day = '0' + day;

  return `${day} de ${monthName} del año ${d.getFullYear()}`
}

export const onErrorHandler = (error) => {

  switch (error.status) {
    case 422:
      let details = '<ul>';
      
      error.data.errors.forEach(error => {
        details += `<li>${error.title}</li>`; 
      });

      details += '</ul>';
      fireMessage("Información", details, 'info', true);
      break;
    case 404:
      fireMessage(error.data.errors.title, error.data.errors.detail);
      break;
    case 401:
      fireMessage(error.data.errors.title, error.data.errors.detail);
      break;
    default:
      fireErrorMessage();
      break;
  }
}

export const fireErrorMessage = () => {
  const MySwal = withReactContent(Swal)
  MySwal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Su petición no ha podido ser procesada, por favor intente de nuevo más tarde.',
    width: "30rem",
    confirmButtonColor: '#8F8C8C',
    confirmButtonText: 'Cancelar',
    customClass:
    {
      cancelButton: 'custom-btn-padding',
      confirmButton: 'custom-btn-padding',
      title: 'font-size-small',
      content: 'font-size-small-content',
    },
  })
};

export const fireMessage = (title = '', text = '', icon='info', html=false) => {
  const MySwal = withReactContent(Swal)
  MySwal.fire({
    icon: icon,
    title: title,
    text: !html? text : null,
    html: html? text: null,
    width: "30rem",
    confirmButtonColor: '#00909E',
    confirmButtonText: 'Aceptar',
    customClass:
    {
      confirmButton: 'custom-btn-padding',
      title: 'font-size-small',
      content: 'font-size-small-content',
    },
  })
}

export const fireToast = (title = '', icon = 'success', properties = {}) => {
  const MySwal = withReactContent(Swal);

  const Toast = MySwal.mixin(updateObject(
    {
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    },
    properties
  ));
  
  Toast.fire({
    icon: icon,
    title: title
  })
}

export const confirmDeleteFireToast = (confirmCallback, message, properties = {}) => {
  const MySwal = withReactContent(Swal)

  MySwal.fire({
    title: '¿Esta seguro?',
    text: "Usted eliminará este registro permanentemente.",
    icon: 'warning',
    width: "30rem",
    customClass:
    {
      cancelButton: 'custom-btn-padding',
      confirmButton: 'custom-btn-padding',
      title: 'font-size-small',
      content: 'font-size-small-content',
    },
    showCancelButton: true,
    showLoaderOnConfirm: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#8F8C8C',
    cancelButtonText: "Cancelar",
    confirmButtonText: 'Eliminar',
    preConfirm: () => {return confirmCallback()}
  }).then((result) => {
    if (result.value) {
      fireToast(message);
    }
  })
}

export const fireDownloadPDF = (html = '', icon='info') => {
  const MySwal = withReactContent(Swal)

  MySwal.fire({
    icon: icon,
    title: '',
    html: html,
    width: "20rem",
    showConfirmButton: false,
    customClass:
    {
      title: 'font-size-small',
      content: 'font-size-small-content',
    },
  })
}

