let attendees = [
  {
    name: 'Gabriel Rodrigues',
    email: 'gabriel@gmail.com',
    registrationDate: new Date(2024, 2, 22, 19, 20),
    checkInDate: null
  },
  {
    name: 'Maria Silva',
    email: 'maria@gmail.com',
    registrationDate: new Date(2024, 3, 5, 10, 30),
    checkInDate: new Date(2024, 3, 10, 12, 15)
  },
  {
    name: 'João Souza',
    email: 'joao@gmail.com',
    registrationDate: new Date(2024, 3, 8, 14, 45),
    checkInDate: new Date(2024, 3, 12, 9, 30)
  },
  {
    name: 'Ana Oliveira',
    email: 'ana@gmail.com',
    registrationDate: new Date(2024, 3, 10, 9, 0),
    checkInDate: null
  },
  {
    name: 'Lucas Santos',
    email: 'lucas@gmail.com',
    registrationDate: new Date(2024, 3, 12, 18, 20),
    checkInDate: new Date(2024, 3, 18, 14, 0)
  },
  {
    name: 'Carolina Lima',
    email: 'carolina@gmail.com',
    registrationDate: new Date(2024, 3, 14, 11, 10),
    checkInDate: new Date(2024, 3, 20, 17, 30)
  },
  {
    name: 'Pedro Almeida',
    email: 'pedro@gmail.com',
    registrationDate: new Date(2024, 3, 16, 13, 50),
    checkInDate: new Date(2024, 3, 22, 8, 45)
  },
  {
    name: 'Mariana Costa',
    email: 'mariana@gmail.com',
    registrationDate: new Date(2024, 3, 18, 20, 40),
    checkInDate: null
  },
  {
    name: 'Rodrigo Pereira',
    email: 'rodrigo@gmail.com',
    registrationDate: new Date(2024, 2, 20, 15, 30),
    checkInDate: new Date(2024, 3, 28, 10, 10)
  },
  {
    name: 'Juliana Ferreira',
    email: 'juliana@gmail.com',
    registrationDate: new Date(2024, 2, 22, 8, 15),
    checkInDate: null
  }
]

const createNewAttendee = attendee => {
  const registrationDate = dayjs(Date.now()).to(attendee.registrationDate)

  const checkInDate = dayjs(Date.now()).to(attendee.checkInDate)

  const checkInButton = `
    <button
      data-email="${attendee.email}"
      onclick="makeCheckIn(event)"
    >
      Confirmar check-in
    </button>
  `

  return `
    <tr>
      <td>
        <strong>
          ${attendee.name}
        </strong>
        <br />
        <small>
          ${attendee.email}
        </small>
      </td>
      <td>
        ${registrationDate}
      </td>
      <td>
        ${attendee.checkInDate ? checkInDate : checkInButton}
      </td> 
    </tr>
  `
}

const updateList = attendees => {
  const tbody = document.querySelector('tbody')

  let output = ''

  for (const attendee of attendees) {
    output = output + createNewAttendee(attendee)
  }

  tbody.innerHTML = output
}

updateList(attendees)

const addAttendee = event => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const attendee = {
    name: formData.get('name'),
    email: formData.get('email'),
    registrationDate: new Date(),
    checkInDate: null
  }

  const attendeeAlreadyExists = attendees.some(a => a.email === attendee.email)

  if (attendeeAlreadyExists) {
    alert('Email já cadastrado!')
    return
  }

  attendees = [attendee, ...attendees]

  updateList(attendees)

  event.target.querySelector('[name="name"]').value = ''
  event.target.querySelector('[name="email"]').value = ''
}

const makeCheckIn = event => {
  const confirmResult = confirm('Tem certeza que deseja fazer o check-in?')

  if (!confirmResult) {
    return
  }

  const attendeeEmail = event.target.dataset.email

  const attendee = attendees.find(attendee => attendee.email === attendeeEmail)

  attendee.checkInDate = new Date()

  updateList(attendees)
}
