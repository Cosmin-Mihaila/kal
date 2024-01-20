import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
  Bars3Icon,
  EllipsisHorizontalIcon,
  PlusSmallIcon,
} from "@heroicons/react/20/solid";
import { BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import logo from "./cropped-cropped-LOGO-KALDIO.png";
import ModalCafele from "./ModalCafele";

const navigation = [
  { name: "Acasa", href: "#" },
  { name: "Facturi", href: "#" },
  { name: "Statistici", href: "#" },
  { name: "Aparate", href: "#" },
];
const secondaryNavigation = [
  { name: "Ultimele 30 zile", href: "#", current: true },
  { name: "Ultimele 90 de zile", href: "#", current: false },
  { name: "All-time", href: "#", current: false },
];
const stats = [
  {
    name: "Revenue",
    value: "$405,091.00",
    change: "+4.75%",
    changeType: "positive",
  },
  {
    name: "Overdue invoices",
    value: "$12,787.00",
    change: "+54.02%",
    changeType: "negative",
  },
  {
    name: "Outstanding invoices",
    value: "$245,988.00",
    change: "-1.39%",
    changeType: "positive",
  },
  {
    name: "Expenses",
    value: "$30,156.00",
    change: "+10.18%",
    changeType: "negative",
  },
];
const statuses = {
  OK: "text-green-700 bg-green-50 ring-green-600/20",
  CAFELE_TERMINATE: "text-black-600 bg-yellow-50 ring-gray-500/10",
  BLOCAT: "text-red-700 bg-red-50 ring-red-600/10",
};
const days = [
  {
    date: "Today",
    dateTime: "2023-03-22",
    transactions: [
      {
        id: 1,
        invoiceNumber: "00012",
        href: "#",
        amount: "$7,600.00 USD",
        tax: "$500.00",
        status: "Paid",
        client: "Reform",
        description: "Website redesign",
        icon: ArrowUpCircleIcon,
      },
      {
        id: 2,
        invoiceNumber: "00011",
        href: "#",
        amount: "$10,000.00 USD",
        status: "Withdraw",
        client: "Tom Cook",
        description: "Salary",
        icon: ArrowDownCircleIcon,
      },
      {
        id: 3,
        invoiceNumber: "00009",
        href: "#",
        amount: "$2,000.00 USD",
        tax: "$130.00",
        status: "Overdue",
        client: "Tuple",
        description: "Logo design",
        icon: ArrowPathIcon,
      },
    ],
  },
  {
    date: "Yesterday",
    dateTime: "2023-03-21",
    transactions: [
      {
        id: 4,
        invoiceNumber: "00010",
        href: "#",
        amount: "$14,000.00 USD",
        tax: "$900.00",
        status: "Paid",
        client: "SavvyCal",
        description: "Website redesign",
        icon: ArrowUpCircleIcon,
      },
    ],
  },
];
const clients = [
  {
    id: 1,
    name: "Tuple",
    imageUrl: "https://tailwindui.com/img/logos/48x48/tuple.svg",
    lastInvoice: {
      date: "December 13, 2022",
      dateTime: "2022-12-13",
      amount: "$2,000.00",
      status: "Overdue",
    },
  },
  {
    id: 2,
    name: "SavvyCal",
    imageUrl: "https://tailwindui.com/img/logos/48x48/savvycal.svg",
    lastInvoice: {
      date: "January 22, 2023",
      dateTime: "2023-01-22",
      amount: "$14,000.00",
      status: "Paid",
    },
  },
  {
    id: 3,
    name: "Reform",
    imageUrl: "https://tailwindui.com/img/logos/48x48/reform.svg",
    lastInvoice: {
      date: "January 23, 2023",
      dateTime: "2023-01-23",
      amount: "$7,600.00",
      status: "Paid",
    },
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hosturl = "https://api.kaldio.cmcode.ro";
  const [aparat, setAparat] = useState(null);
  const [aparate, setAparate] = useState([]);
  const [totalCafele, setTotalCafele] = useState();
  const [totalBlocat, setTotalBlocat] = useState(null);
  const [totalCafeleTerminate, setTotalCafeleTerminate] = useState();
  useEffect(() => {
    axios.get(hosturl + "/dataList.php").then((response) => {
      console.log(response);
      setAparate(response.data.dataList);
      setAparat(response.data.dataList[0]);
      setTotalCafele(10);
      if (response.data.dataList[0]["BLOCAT_CAFELE"] == 1) {
        setTotalCafeleTerminate(1);
      } else {
        setTotalCafeleTerminate(0);
      }
      if (response.data.dataList[0]["BLOCAT_FACTURA"] == 1) {
        setTotalBlocat(1);
      } else {
        setTotalBlocat(0);
      }
    });
  }, []);

  const onClickBlocheaza = () => {
    axios.get(hosturl + "/update.php?id=12345&operatie=1").then((response) => {
      console.log(response);
      axios.get(hosturl + "/dataList.php").then((response) => {
        console.log(response);
        setAparate(response.data.dataList);
        setAparat(response.data.dataList[0]);
        setTotalCafele(10);
        if (response.data.dataList[0]["BLOCAT_CAFELE"] == 1) {
          setTotalCafeleTerminate(1);
        } else {
          setTotalCafeleTerminate(0);
        }
        if (response.data.dataList[0]["BLOCAT_FACTURA"] == 1) {
          setTotalBlocat(1);
        } else {
          setTotalBlocat(0);
        }
      });
    });
  };

  const onClickDeblocheaza = () => {
    axios.get(hosturl + "/update.php?id=12345&operatie=0").then((response) => {
      console.log(response);
      axios.get(hosturl + "/dataList.php").then((response) => {
        console.log(response);
        setAparate(response.data.dataList);
        setAparat(response.data.dataList[0]);
        setTotalCafele(10);
        if (response.data.dataList[0]["BLOCAT_CAFELE"] == 1) {
          setTotalCafeleTerminate(1);
        } else {
          setTotalCafeleTerminate(0);
        }
        if (response.data.dataList[0]["BLOCAT_FACTURA"] == 1) {
          setTotalBlocat(1);
        } else {
          setTotalBlocat(0);
        }
      });
    });
  };

  const onClickTest = (e) => {
    e.preventDefault();
    axios.post(hosturl + "/receiver.php", {
      id: 12345,
      counter: 250,
      total: 100,
      relay: "on",
    });
  };

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center gap-x-6">
            <button
              type="button"
              className="-m-3 p-3 md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-5 w-5 text-gray-900" aria-hidden="true" />
            </button>
            <img className="h-8 w-auto" src={logo} alt="Your Company" />
          </div>
          <nav className="hidden md:flex md:gap-x-11 md:text-sm md:font-semibold md:leading-6 md:text-gray-700">
            {navigation.map((item, itemIdx) => (
              <a key={itemIdx} href={item.href}>
                {item.name}
              </a>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end gap-x-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your profile</span>
              <img
                className="h-8 w-8 rounded-full bg-gray-800"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </a>
          </div>
        </div>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
            <div className="-ml-0.5 flex h-16 items-center gap-x-6">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="-ml-0.5">
                <a href="#" className="-m-1.5 block p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div className="mt-2 space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <ModalCafele open={open} setOpen={setOpen} />
      <main>
        <div className="relative isolate overflow-hidden pt-16">
          {/* Secondary navigation */}
          <header className="pb-4 pt-6 sm:pb-6">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
              <h1 className="text-base font-semibold leading-7 text-gray-900">
                Statistici
              </h1>
              <div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
                {secondaryNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={
                      item.current ? "text-indigo-600" : "text-gray-700"
                    }
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <a
                href="#"
                className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
                Adauga aparat
              </a>
            </div>
          </header>

          {/* Stats */}
          <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
            <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
              <div
                key={"total"}
                className={classNames(
                  "sm-border-1",
                  "flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8"
                )}
              >
                <dt className="text-sm font-medium leading-6 text-gray-500">
                  Total cafele
                </dt>
                <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                  {aparat?.TOTAL_CAFELE}
                </dd>
              </div>
              <div
                key={"total"}
                className={classNames(
                  "sm-border-1",
                  "flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8"
                )}
              >
                <dt className="text-sm font-medium leading-6 text-gray-500">
                  Aparate OK
                </dt>
                <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                  {totalBlocat == 1 || totalCafeleTerminate == 1 ? "0" : "1"}
                </dd>
              </div>
              <div
                key={"total"}
                className={classNames(
                  "sm-border-1",
                  "flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8"
                )}
              >
                <dt className="text-sm font-medium leading-6 text-gray-500">
                  Aparate fara cafea
                </dt>
                <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                  {!totalCafeleTerminate ? "0" : totalCafeleTerminate}
                </dd>
              </div>
              <div
                key={"total"}
                className={classNames(
                  "sm-border-1",
                  "flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8"
                )}
              >
                <dt className="text-sm font-medium leading-6 text-gray-500">
                  Aparate blocate
                </dt>
                <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                  {totalBlocat == null ? "" : totalBlocat}
                </dd>
              </div>
            </dl>
          </div>

          <div
            className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
            aria-hidden="true"
          >
            <div
              className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
              style={{
                clipPath:
                  "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
              }}
            />
          </div>
        </div>
        <div className="space-y-16 py-16 xl:space-y-20">
          {/* Recent activity table */}
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                Aparate
              </h2>
            </div>
            <div className="mt-6 overflow-hidden border-t border-gray-100">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                  <table className="w-full text-left">
                    <thead className="sr-only">
                      <tr>
                        <th>Amount</th>
                        <th className="hidden sm:table-cell">Client</th>
                        <th>More details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!aparat ? (
                        ""
                      ) : (
                        <Fragment key={aparat.ID}>
                          <tr className="text-sm leading-6 text-gray-900">
                            <th
                              scope="colgroup"
                              colSpan={3}
                              className="relative isolate py-2 font-semibold"
                            >
                              {/* <time dateTime={day.dateTime}>{day.date}</time> */}
                              <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                              <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                            </th>
                          </tr>
                          <tr key={aparat.id}>
                            <td className="relative py-5 pr-6">
                              <div className="flex gap-x-6">
                                <ArrowUpCircleIcon
                                  className="hidden h-6 w-5 flex-none text-green-400 sm:block"
                                  aria-hidden="true"
                                />
                                <div className="flex-auto">
                                  <div className="flex items-start gap-x-3">
                                    <div className="text-sm font-medium leading-6 text-gray-900">
                                      {aparat.ID}
                                    </div>
                                    {aparat.BLOCAT_FACTURA == 1 ? (
                                      <div
                                        className={classNames(
                                          statuses["BLOCAT"],
                                          "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                                        )}
                                      >
                                        BLOCAT
                                      </div>
                                    ) : aparat.BLOCAT_CAFELE == 1 ? (
                                      <div
                                        className={classNames(
                                          statuses["CAFELE_TERMINATE"],
                                          "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                                        )}
                                      >
                                        FARA CAFEA
                                      </div>
                                    ) : (
                                      <div
                                        className={classNames(
                                          statuses["OK"],
                                          "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                                        )}
                                      >
                                        OK
                                      </div>
                                    )}
                                  </div>
                                  {aparat.CAFELE_RAMASE ? (
                                    <div className="mt-1 text-xs leading-5 text-gray-500">
                                      {aparat.CAFELE_RAMASE} cafele ramase
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                              <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                            </td>
                            <td className="hidden py-5 pr-6 sm:table-cell">
                              <div className="text-sm leading-6 text-gray-900">
                                {aparat.NUME}
                              </div>
                              <div className="mt-1 text-xs leading-5 text-gray-500">
                                {aparat.LOCATIE}
                              </div>
                            </td>
                            <td className="hidden py-5 pr-6 sm:table-cell">
                              <div className="text-sm leading-6 text-gray-900">
                                Total cafele: {aparat?.TOTAL_CAFELE}
                              </div>
                              <div className="mt-1 text-xs leading-5 text-gray-500">
                                Ultima activitate: {aparat.ULTIMA_CAFEA}
                              </div>
                            </td>
                            <td className="py-5 text-right">
                              <div className="flex justify-end">
                                {aparat.BLOCAT_FACTURA == 0 ? (
                                  <button
                                    // href={transaction.href}
                                    onClick={onClickBlocheaza}
                                    className="bg-red-600 px-6 py-1 rounded-md text-sm font-medium leading-6 text-white hover:text-black"
                                  >
                                    Blocheaza aparat
                                    <span className="sr-only">
                                      , invoice #{aparat.ID}, {aparat.ID}
                                    </span>
                                  </button>
                                ) : (
                                  <button
                                    // href={transaction.href}
                                    onClick={onClickDeblocheaza}
                                    className="bg-red-600 px-6 py-1 rounded-md text-sm font-medium leading-6 text-white hover:text-black"
                                  >
                                    Deblocheaza aparat
                                    <span className="sr-only">
                                      , invoice #{aparat.ID}, {aparat.ID}
                                    </span>
                                  </button>
                                )}
                              </div>
                              <div className="mt-1 text-xs leading-5 text-gray-500">
                                Contract nr{" "}
                                <span className="text-gray-900">
                                  1/23.05.2023
                                </span>
                              </div>
                            </td>
                            <td>
                              <button
                                // href={transaction.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setOpen(true);
                                }}
                                className="bg-green-600 px-6 py-1 rounded-md text-sm font-medium leading-6 text-white hover:text-black"
                              >
                                Seteaza cafele
                              </button>
                            </td>
                          </tr>
                        </Fragment>
                      )}
                      {/* {days.map((day) => (
                        <Fragment key={day.dateTime}>
                          <tr className="text-sm leading-6 text-gray-900">
                            <th
                              scope="colgroup"
                              colSpan={3}
                              className="relative isolate py-2 font-semibold"
                            >
                              <time dateTime={day.dateTime}>{day.date}</time>
                              <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                              <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                            </th>
                          </tr>
                          {day.transactions.map((transaction) => (
                            <tr key={transaction.id}>
                              <td className="relative py-5 pr-6">
                                <div className="flex gap-x-6">
                                  <transaction.icon
                                    className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                                    aria-hidden="true"
                                  />
                                  <div className="flex-auto">
                                    <div className="flex items-start gap-x-3">
                                      <div className="text-sm font-medium leading-6 text-gray-900">
                                        {transaction.amount}
                                      </div>
                                      <div
                                        className={classNames(
                                          statuses[transaction.status],
                                          "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                                        )}
                                      >
                                        {transaction.status}
                                      </div>
                                    </div>
                                    {transaction.tax ? (
                                      <div className="mt-1 text-xs leading-5 text-gray-500">
                                        {transaction.tax} tax
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                              </td>
                              <td className="hidden py-5 pr-6 sm:table-cell">
                                <div className="text-sm leading-6 text-gray-900">
                                  {transaction.client}
                                </div>
                                <div className="mt-1 text-xs leading-5 text-gray-500">
                                  {transaction.description}
                                </div>
                              </td>
                              <td className="py-5 text-right">
                                <div className="flex justify-end">
                                  <a
                                    href={transaction.href}
                                    className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                                  >
                                    View
                                    <span className="hidden sm:inline">
                                      {" "}
                                      transaction
                                    </span>
                                    <span className="sr-only">
                                      , invoice #{transaction.invoiceNumber},{" "}
                                      {transaction.client}
                                    </span>
                                  </a>
                                </div>
                                <div className="mt-1 text-xs leading-5 text-gray-500">
                                  Invoice{" "}
                                  <span className="text-gray-900">
                                    #{transaction.invoiceNumber}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </Fragment>
                      ))} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
