export default function Page({params}: {params: {lng: string, historyId: string}}) {
  const {lng, historyId} = params;

  return (
    <div>
      <h1>History ID: {historyId}</h1>
      <p>Language: {lng}</p>
    </div>
  )
}