import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import { redirect, useLoaderData } from '@remix-run/react';
import { commitSession, getSession } from '~/session';

/**
 * this will be called on load the page
 */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'));
  const data = session.get('cogoPayload') || { name: '', solarPanelKw: null };

  return json(data);
};

/** this will be called when POST request is done from COGO
 * which we will set session on
 * https://remix.run/docs/en/main/utils/sessions
 */
export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'));
  const data = await request.formData();

  session.set('cogoPayload', {
    name: data.get('name'),
    solarPanelKw: data.get('solarPanelKw'),
  });

  return redirect('/brighte-marketplace-form-submit', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Brighte Marketplace</h1>
      <div>name: {loaderData.name}</div>
      <div>solarPanelKw: {loaderData.solarPanelKw}</div>
    </div>
  );
}
