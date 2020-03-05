var app = new Vue({
  el: '#app',
  data: {
    fullname: '',
    email: '',
    phone: '',
    cocheras: '',
    district: '',
    encontrado: '',

    state: {
      fullname: null,
      email: null,
      phone: null,
      cocheras: null,
      district: null,
      encontrado: null
    },

    formResponse: {
      error: null,
      message: null
    },

    formWaiting: false
  },
  

  watch: {
    fullname(value) {
      this.validateFullname()
    },

    email(value) {
      this.validateEmail()
    },

    phone(value) {
      this.validatePhone()
    },

    cocheras(value) {
      this.validateCocheras()
    },

    district(value) {
      this.validateDistrict()
    },

    encontrado(value) {
      this.validateEncontrado()
    }
  },

  methods: {
    trySubmit() {
      this.validateFullname()
      this.validateEmail()
      this.validatePhone()
      this.validateCocheras()
      this.validateDistrict()
      this.validateEncontrado()
      if(
        this.state.fullname == true &&
        this.state.email == true &&
        this.state.phone == true &&
        this.state.cocheras == true &&
        this.state.district == true &&
        this.state.encontrado == true
      ) {
        this.formWaiting = true
        this.sendForm()
      }
    },

    sendForm() {
      let userData = {
        fullname: this.fullname,
        email: this.email,
        phone: this.phone,
        cocheras: this.cocheras,
        district: this.district,
        encontrado: this.encontrado
      }

      console.log(userData)
      $.ajax({
        type: 'POST',
        url: '/send-form.php',
        data: userData,
        beforeSend: function() {
            console.log('Espere...');
        },
        success: resp => {
          console.log(resp)
          if(resp == 200 ) {
            fullname = ''
            email = ''
            phone = ''
            cocheras = ''
            district = ''
            encontrado = ''
        
            this.formResponse.error = false
            this.formResponse.message = '¡Gracias! Hemos recibido tus datos, nos pondremos en contacto lo antes posible.'
            this.formWaiting = false
          } else if(resp == 400) {
            this.formResponse.error = true
            this.formResponse.message = 'El correo ya se encuentra registrado.'
            this.formWaiting = false
          } else {
            this.formResponse.error = true
            this.formResponse.message = 'Algo salió mal, por favor inténtelo nuevamente en unos minutos.'
            this.formWaiting = false
          }
        }
      });
      // axios.post('https://omelet.pe/qp/send-form.php', data)
      // .then(response => {
      //   this.formResponse.error = false
      //   this.formResponse.message = '¡Gracias! Hemos recibido tus datos, nos pondremos en contacto lo antes posible.'
      //   this.formWaiting = false
      // })
      // .catch(error => {
      //   this.formResponse.error = true
      //   this.formResponse.message = 'Algo salió mal, por favor inténtelo nuevamente en unos minutos.'
      //   this.formWaiting = false
      // })
    },

    setFormResponse(errorBoolean, message) {
      this.formResponse.error = errorBoolean
      this.formResponse.message = message
    },

    validateFullname() {
      if(this.fullname.length > 4) {
        this.state.fullname = true
        return true
      } else {
        this.state.fullname = false
        return false
      }
    },

    validateEmail() {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      if( re.test(String(this.email).toLowerCase()) ) {
        this.state.email = true
        return true
      } else {
        this.state.email = false
        return false
      }
    },

    validatePhone() {
      if(this.phone.length >= 9) {
        this.state.phone = true
        return true
      } else {
        this.state.phone = false
        return false
      }
    },

    validateCocheras() {
      if(this.cocheras == null || this.cocheras == '') {
        this.state.cocheras = false
        return false
      } else {
        this.state.cocheras = true
        return true
      }
    },
    
    validateDistrict() {
      if(this.district == null || this.district == '') {
        this.state.district = false
        return false
      } else {
        this.state.district = true
        return true
      }
    },
    
    validateEncontrado() {
      if(this.encontrado == null || this.encontrado == '') {
        this.state.encontrado = false
        return false
      } else {
        this.state.encontrado = true
        return true
      }
    }
  }
})