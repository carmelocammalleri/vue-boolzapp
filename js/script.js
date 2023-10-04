const {createApp} =  Vue;

const dt = luxon.DateTime;

createApp ({
  data(){
    return{
        contacts: [
        {
            name: 'Michele',
            avatar: './img/avatar_1.jpg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di stendere i panni',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
                }
            ],
          },
          {
            name: 'Fabio',
            avatar: './img/avatar_2.jpg',
            visible: true,
            messages: [
              {
                date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                  },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent'
                }
            ],
        },
        {
          name: 'Samuele',
          avatar: './img/avatar_3.jpg',
            visible: true,
            messages: [
              {
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                  },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                  },
                {
                  date: '28/03/2020 16:15:22',
                  message: 'Ah scusa!',
                  status: 'received'
                }
            ],
        },
        {
          name: 'Alessandro B.',
          avatar: './img/avatar_4.jpg',
          visible: true,
          messages: [
            {
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                }
            ],
        },
        {
          name: 'Alessandro L.',
          avatar: './img/avatar_5.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ricordati di chiamare la nonna',
                    status: 'sent'
                },
                {
                  date: '10/01/2020 15:50:00',
                    message: 'Va bene, stasera la sento',
                    status: 'received'
                  }
                ],
              },
        {
            name: 'Claudia',
            avatar: './img/avatar_6.jpg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Ciao Claudia, hai novità?',
                    status: 'sent'
                  },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Non ancora',
                    status: 'received'
                  },
                {
                  date: '10/01/2020 15:51:00',
                  message: 'Quindi nessuna nuova, che peccato. Ci sentiamo presto',
                  status: 'sent'
                }
              ]
        },
        {
          name: 'Federico',
          avatar: './img/avatar_7.jpg',
          visible: true,
          messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Fai gli auguri a Martina che è il suo compleanno!',
                    status: 'sent'
                },
                {
                  date: '10/01/2020 15:50:00',
                    message: 'Grazie per avermelo ricordato, le scrivo subito!',
                    status: 'received'
                }
              ],
        },
        {
            name: 'Davide',
            avatar: './img/avatar_8.jpg',
            visible: true,
            messages: [
              {
                date: '10/01/2020 15:30:55',
                message: 'Ciao, andiamo a mangiare la pizza stasera?',
                    status: 'received'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:51:00',
                    message: 'OK!!',
                    status: 'received'
                }
            ]
          }
        ],
        contactCurrent:0,
        newMsg: [],
        isError: false,
        searchValue: ''
    }  
  },

  methods: {

    // funzione per impostare l'index del contatto cliccato
    setIndexContact(position) {
        this.contactCurrent = position;
        return this.contactCurrent;
    },

    // funzione per aggiungere un nuovo messaggio
    sendMsg(){
      if(this.newMsg.length <1){

        // per non far inviare messaggio vuoto
        isError: true
      } else {

        // salva in un array ad oggetti e poi lo stampa nella chat
        let sentMessage= {
          message: '',
          date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
          status: 'sent'
        };

        sentMessage.message = this.newMsg;
        this.contacts[this.contactCurrent].messages.push(sentMessage)
        console.log(sentMessage);
        this.newMsg ='';
      }
    },
    receivedMsg (){

      //funzione nuovo messaggio ricevuto
      let receivedMessage = {
        message: 'Ok!',
        date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
        status: 'received'
      }
      setTimeout(()=> this.contacts[this.contactCurrent].messages.push(receivedMessage) , 3000)
    },

    //seleziona ultimo messaggio
    getLastMessage(contact){
      return contact.messages.at(-1).message
    },

    //seleziona ultima data di invio messaggio
    getLastDate(contact){
      return contact.messages.at(-1).date
    },
  },

  computed:{
    //search element
    searchElement(){
      if(this.searchValue.trim().length > 0){
        // se scriviamo anche una sola lettera nell'input ci ritorna il nome del contatto all'interno dell'array. Con il primo lower case  posso cercare anche con lettere in minuscolo con l'ultimo sistemo anche il fatto di poter cercare con il maiuscolo
        return this.contacts.filter((contact)=> contact.name.toLowerCase().includes(this.searchValue.trim().toLowerCase()))
      } 
        return this.contacts
    }
  }
  

}).mount('#app')