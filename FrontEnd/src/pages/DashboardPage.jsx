import AddToList from '../components/AddToList';
import ViewTheList from '../components/ViewTheList';


function DashboardPage({ onLogout }) { 
  return (
    <>
      <AddToList />
      <ViewTheList /> 
   </>   
  )
}

export default DashboardPage;