interface Props {
    todo : string,
    setTodo : React.Dispatch<React.SetStateAction<string>>,
    handleAdd : (e: React.FormEvent) => void;
}

const InputField : React.FC <Props> = ({ todo, setTodo, handleAdd }) => {

    console.log(todo);

  return (
    <form className='bg-white rounded-full mx-auto w-3/5 p-2 flex' onSubmit={handleAdd}>
        <input value={todo} onChange={e => setTodo(e.target.value)} type="text" className='flex-1 rounded-full' placeholder='Enter a task' />
        <button className='bg-blue-500 rounded-full p-4 text-white font-bold'>Go</button>
    </form> 
  )
}

export default InputField