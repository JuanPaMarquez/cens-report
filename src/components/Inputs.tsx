
function InputLogin({ 
  inputElement, 
  setInputElement,
  placeholder,
  type='text',
  Icon,
}: {
  inputElement: string,
  setInputElement: (e: string) => void,
  type?: string,
  placeholder: string,
  Icon: React.ElementType,
}) {

  const handleElement = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputElement(e.target.value);
  }

  return (
    <>
      {inputElement === '' && (
          <div className="absolute top-3 left-3">
            <Icon className="size-5" />
          </div>
        )}
      <input 
        className="text-center w-60 p-2 border-2 border-gray-400 rounded-3xl"
        type={type} 
        placeholder={placeholder}
        value={inputElement}
        onChange={handleElement}
        required
      />
    </>
  );
}

function InputRegister ({ 
  inputElement, 
  setInputElement,
  placeholder,
  type='text',
  onChange,
}: {
  inputElement: string,
  setInputElement: (e: string) => void,
  type?: string,
  placeholder: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}){

  const handleElement = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputElement(e.target.value);
  }

  return (
    <input 
      className="p-2 w-70 h-10 border-2 border-gray-400 rounded-lg"
      type={type} 
      placeholder={placeholder}
      value={inputElement}
      onChange={ onChange ? onChange : handleElement}
      required
    />
  )
}

export { InputLogin, InputRegister };