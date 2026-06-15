import BackDahboardBut from "./BackDahboardBut"
import ChangeThemeBut from "./ChangeThemeBut"

export default function TopButtons(){
return (
  <div className="flex justify-between">
    <BackDahboardBut/> 
    <ChangeThemeBut/>
  </div>
);
}