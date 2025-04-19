
import Layout from "@/components/Layout";
import AppointmentList from "@/components/AppointmentList";

const AppointmentsPage = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
        <p className="text-gray-600">Manage your upcoming doctor appointments</p>
      </div>
      
      <AppointmentList />
    </Layout>
  );
};

export default AppointmentsPage;
