// export const metadata = meta({
//   title: 'Login',
//   description: `Login at ${siteName}.`,
//   openGraphImage: logo,
// })
export async function generateMetadata() {
  return {
    title: 'เข้าสู่ระบบ',
    description: 'A I S T',

  };
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
