import Layout from "@/components/Layout";
import DoctorDirectory from "@/components/DoctorDirectory";

const Index = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find a Doctor</h1>
        <p className="text-gray-600">
          Book an appointment with a top specialist in your area
        </p>
      </div>

      <DoctorDirectory />
    </Layout>
  );
};

export default Index;
