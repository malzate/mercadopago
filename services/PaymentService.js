const axios = require("axios");

class PaymentService {
  constructor() {
    this.tokensMercadoPago = {
      prod: {},
      test: {
        access_token:
          "APP_USR-8208253118659647-112521-dd670f3fd6aa9147df51117701a2082e-677408439"
      }
    };
    this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
  }

  async createPaymentMercadoPago(name, price, unit, img) {
    const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`;

    const items = [
      {
        id: "1234",
        title: name,
        description: "Dispositivo movil de Tienda e-commerce",
        picture_url: "https://courseit.com.ar/static/logo.png",
        category_id: "1234",
        quantity: parseInt(unit),
        currency_id: "PEN",
        unit_price: parseFloat(price)
      }
    ];

    const preferences = {
      items,
      external_reference: "manuelfernandolazatequintero1@gmail.com",
      payer: {
        name: "Lalo",
        surname: "Landa",
        email: "test_user_46542185@testuser.com",
        phone: {
          area_code: "52",
          number: "5549737300"
        },
        address: {
          zip_code: "03940",
          street_name: "Insurgentes Sur",
          street_number: "1602"
        }
      },
      payment_methods: {
        excluded_payment_methods: [
          {
            id: "diners"
          }
        ],
        excluded_payment_types: [{ id: "atm" }],
        installments: 6,
        default_installments: 6
      },
      back_urls: {
        success: "https://manuelalzate-mp-ecommerce-node.herokuapp.com/success",
        pending: "https://manuelalzate-mp-ecommerce-node.herokuapp.com/pending",
        failure: "https://manuelalzate-mp-ecommerce-node.herokuapp.com/error"
      },
      notification_url: "https://manuelalzate-mp-ecommerce-node.herokuapp.com/webhook",
      auto_return: "approved"
    };

    try {
      const request = await axios.post(url, preferences, {
        headers: {
          "Content-Type": "application/json",
          "x-integrator-id": "dev_2e4ad5dd362f11eb809d0242ac130004"
        }
      });
      return request.data;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = PaymentService;
