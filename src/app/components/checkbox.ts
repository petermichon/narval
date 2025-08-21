function newCheckbox(): HTMLInputElement {
  const checkbox = document.createElement('input')

  checkbox.type = 'checkbox'
  checkbox.className = 'w-5 h-5 accent-blue-500 rounded cursor-pointer'

  // Create label
  const label = document.createElement('label')
  label.className = 'flex items-center space-x-2 text-gray-800 text-lg'
  label.appendChild(checkbox)

  const span = document.createElement('span')
  span.textContent = 'I agree'
  label.appendChild(span)

  checkbox.addEventListener('change', () => {
    console.log('Checked?', checkbox.checked)
  })

  return checkbox
}

export { newCheckbox }
