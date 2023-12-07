import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [Length,setLength]=useState(6)
  const [includeNumber, setIncludeNumber] = useState(false);
  const [includeCharacter, setIncludeCharacter] = useState(false);
  const [password,setPassword]=useState(1)
const reff=useRef()
  const GeneratorNewPassword = useCallback(() => {
    let pass = '';
    let numbers = '0123456789';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (includeNumber) chars =  numbers;
    if (includeCharacter) chars = chars + '`!@#$%^&*()_+=-/[]{}';
  
    for (let i = 1; i <= Length; i++) {
      let num = Math.floor(Math.random() * chars.length);
      pass = pass + chars.charAt(num);
    }
    setPassword(pass);
  }, [Length, includeCharacter, includeNumber, setPassword]);

  const copyPassWord=useCallback(()=>{
    reff.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    GeneratorNewPassword();
  }, [Length, includeCharacter, includeNumber,GeneratorNewPassword]);
    



  return (
    <>
      <div className=" w-full h-screen flex flex-col items-center absolute top-12">
        <div className="bg-[#000036] w-[35rem] h-[10rem] flex flex-col justify-center items-center">
          <div className="flex ">
          <input
  type="text"
  placeholder="Generator password"
  className="focus:outline-none focus:border-2 focus:border-blue-300 text-center w-[20rem]"
  onChange={(e) => setLength(e.target.value)}
  value={password}
   ref={reff}
/>
            <label className="bg-blue-600 w-[4rem] h-[3rem] flex items-center justify-center value" onClick={copyPassWord}>Copy</label>
          </div>
          <div className="flex gap-4 mt-5">
           <div className="flex gap-2">
           <input type="range" min={"6"} max={"20"} value={Length}  onChange={ (e)=>setLength(e.target.value)}/>
            <label className="text-white">Length:{Length}</label>
           </div>
            <div className="flex gap-2">
              <input type="checkbox"  onChange={ () => setIncludeNumber((prev) => !prev)} defaultChecked={includeNumber}/>
              <label className="text-white">Number</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox"  onChange={ () => setIncludeCharacter((prev) => !prev)} defaultChecked={includeCharacter} />
              <label className="text-white">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
