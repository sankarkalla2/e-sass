interface HeadingProps {
  title: string;
  description: string;
}
const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-sm text-muted-foreground">
        Manage store and preferences
      </p>
    </div>
  );
};

export default Heading;
