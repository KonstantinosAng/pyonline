import { useEffect, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  const [showInputLib, setShowInputLib] = useState(false);
  const [env, setEnv] = useState(
    localStorage?.getItem("pythonLibraries")
      ? localStorage?.getItem("pythonLibraries").split(",")
      : ["numpy", "matplotlib", "bokeh", "pandas", "panel"]
  );

  const handleInput = (e) => {
    console.log(e);
    console.log(e.target.innerText);
  };

  const addNewLib = (e) => {
    e.preventDefault();
    if (e.target[0].value.trim() !== "") {
      setEnv([...new Set([...env, e.target[0].value])]);
      localStorage.setItem("pythonLibraries", [
        ...new Set([...env, e.target[0].value]),
      ]);
    }
  };

  useEffect(() => {
    const elements = document.getElementsByTagName("py-repl");
    for (let element of elements) {
      element.addEventListener("input", handleInput);
    }
    return () => {
      for (let element of elements) {
        element.removeEventListener("input", handleInput);
      }
    };
  }, []);

  return (
    <>
      <py-env>{env.map((lib) => `\n    - ${lib}`)}</py-env>
      {/* <py-script>import math print(math.sqrt(49))</py-script>
      <py-script src="./scripts/example.py"></py-script> */}
      {/* <br /> */}
      {/* <h3>Visualization</h3> */}
      {/* <div id="plot"></div> */}
      {/* <py-script>
      import asyncio
      import panel as pn
      import numpy as np
      import pandas as pd
      from bokeh.models import ColumnDataSource
      from bokeh.plotting import figure
      from panel.io.pyodide import show
      df = pd.DataFrame(np.random.randn(10, 4), columns=list('ABCD')).cumsum()
      p = figure(height=450, width=600)
      cds = ColumnDataSource(data=ColumnDataSource.from_df(df))  
      p.line('index', 'A', source=cds, line_color='firebrick')
      p.line('index', 'B', source=cds, line_color='dodgerblue')
      p.line('index', 'C', source=cds, line_color='goldenrod')
      p.line('index', 'D', source=cds, line_color='purple')
      await show(p, 'plot')
    </py-script> */}
      <h2 className="font-bold text-2xl p-4 border-b-4 border-slate-100 bg-blue-400">
        Interactive Python REPL
      </h2>
      <section className="pt-4 h-screen overflow-y-auto bg-slate-800 text-lg">
        <p className="font-bold text-slate-100 p-4">Available libraries:</p>
        <div className="flex space-x-5 justify-start items-center px-4">
          {env.map((lib) => (
            <span
              key={`library-${lib}`}
              className="relative text-slate-800 font-bold text-base px-5 py-3 bg-blue-400 rounded-lg shadow-md"
            >
              {lib}
              {/* <span
                onClick={() => setEnv(env.filter((l) => l !== "pandas"))}
                className="absolute -top-1 right-1 cursor-pointer text-xl"
              >
                x
              </span> */}
            </span>
          ))}
        </div>
        {/* <form
          onSubmit={addNewLib}
          className="flex p-4 align-center justify-start space-x-5"
        >
          <input
            name="newLib"
            className="rounded-sm outline-none px-2 py-1"
            type="text"
            placeholder="Add new library"
          />
          <button
            type="submit"
            className="text-slate-800 font-bold text-base px-3 py-1 bg-blue-400 rounded-lg shadow-md"
          >
            +
          </button>
        </form> */}
        <p className="font-bold text-slate-100 p-4">Start writing python...</p>
        <ErrorBoundary>
          <py-repl className="h-full" id="repl-demo" auto-generate="true" />
        </ErrorBoundary>
      </section>
    </>
  );
}

export default App;
