import{r as e}from"./preload-helper-Dcl5TOAQ.js";import{c as t,n,o as r,r as i,s as a,t as o}from"./storyStyle-BBTl-8tQ.js";function s(){document.querySelectorAll(`[data-neko]`).forEach(e=>e.remove()),clearInterval(window.nekoInterval)}function c(e,t,n=!1){let r=document.createElement(`button`);return r.textContent=e,r.onclick=t,r.disabled=n,r}function l(...e){let t=document.createElement(`div`);return t.className=`row`,e.forEach(e=>t.appendChild(e)),t}function u(...e){let t=document.createElement(`div`);return t.id=`app`,e.forEach(e=>t.appendChild(e)),t}function d(e){let t=document.createElement(`p`);return t.className=`story-desc`,t.textContent=e,t}function f(e){let t=document.createElement(`code`);return t.className=`story-code`,t.textContent=e,t}function p(e){let t=document.createElement(`span`);return t.className=`story-status`,t.textContent=e,t}var m,h,g,_,v,y,b,x,S,C,w;e((()=>{r(),i(),o(),m=Object.entries(n),h=new Map(m),g=[`default (gif)`,...m.map(([e])=>e)],_=null,v={title:`Neko`,parameters:{layout:`fullscreen`},argTypes:{nekoSize:{control:`select`,options:[`SMALL`,`MEDIUM`,`LARGE`],description:"Size of the neko element. Maps to `NekoSizeVariations` (SMALL=32px, MEDIUM=38px, LARGE=42px).",table:{defaultValue:{summary:`SMALL`}}},speed:{control:{type:`range`,min:10,max:20,step:1},description:`Pixels moved per animation frame. Clamped to [10, 20].`,table:{defaultValue:{summary:`10`}}},animationSpeed:{name:`Frame delay (ms)`,control:{type:`range`,min:16,max:500,step:10},description:`Delay between sprite frame updates in ms — lower = faster animation. e.g. 16ms ≈ 60fps, 100ms ≈ 10fps, 500ms ≈ 2fps.`,table:{defaultValue:{summary:`100`}}},defaultState:{control:`radio`,options:[`awake`,`sleep`],description:"Initial state. `sleep` spawns neko at origin and waits for `wake()`.",table:{defaultValue:{summary:`awake`}}},breed:{control:`select`,options:g,description:"Preset breed sprite sheet. Select `default (gif)` for the built-in neko.gif.",table:{defaultValue:{summary:`default (gif)`}}}},args:{nekoSize:`SMALL`,speed:10,animationSpeed:100,defaultState:`awake`,breed:`default (gif)`}},y={name:`Playground`,tags:[`autodocs`],render:e=>{let n=e.breed===`default (gif)`?void 0:h.get(e.breed),r=t[e.nekoSize],i=!!document.querySelector(`[data-neko="1"]`);_&&i?(_.setBreed(n),_.setSize(r),_.setSpeed(e.speed),_.setAnimationSpeed(e.animationSpeed),e.defaultState===`sleep`&&_.isAwake&&_.sleep(),e.defaultState===`awake`&&!_.isAwake&&_.wake()):(s(),_=new a({nekoId:1,nekoSize:r,speed:e.speed,animationSpeed:e.animationSpeed,defaultState:e.defaultState,origin:{x:window.innerWidth/2,y:window.innerHeight/2},breed:n}));let o=e.breed===`default (gif)`?``:`\n  breed: breeds.${e.breed},`,c=[`new Neko({`,`  nekoSize: NekoSizeVariations.${e.nekoSize},`,`  speed: ${e.speed},`,`  animationSpeed: ${e.animationSpeed},`,`  defaultState: "${e.defaultState}",`,`  origin: { x: window.innerWidth / 2, y: window.innerHeight / 2 },`+o,`})`].join(`
`);return u(d(`Move your cursor to make the neko follow it. Adjust controls in the panel to see changes.`),f(c))}},b={name:`State / Sleep & Wake Controls`,args:{defaultState:`awake`},render:e=>{s();let n=t[e.nekoSize],r=new a({nekoId:1,nekoSize:n,speed:e.speed,animationSpeed:e.animationSpeed,defaultState:e.defaultState,origin:{x:window.innerWidth/2,y:window.innerHeight/2}}),i=p(r.isAwake?`awake`:`asleep`),o=c(`sleep()`,()=>{r.sleep(),i.textContent=`asleep`,o.disabled=!0,m.disabled=!1},!r.isAwake),m=c(`wake()`,()=>{r.wake(),i.textContent=`awake`,m.disabled=!0,o.disabled=!1},r.isAwake);return u(d(`sleep() stops cursor tracking and idles the neko in place. wake() resumes it.`),l(o,m),l(f(`neko.isAwake: `),i))}},x={name:`State / Destroy & Recreate`,render:e=>{s();let n=t[e.nekoSize],r=e.breed===`default (gif)`?void 0:h.get(e.breed),i=new a({nekoId:1,nekoSize:n,speed:e.speed,animationSpeed:e.animationSpeed,breed:r}),o=p(`alive`),m=c(`destroy()`,()=>{i?.destroy(),i=null,o.textContent=`destroyed`,m.disabled=!0,g.disabled=!1}),g=c(`Recreate`,()=>{s(),i=new a({nekoId:1,nekoSize:n,speed:e.speed,animationSpeed:e.animationSpeed,breed:r}),o.textContent=`alive`,m.disabled=!1,g.disabled=!0},!0);return u(d(`destroy() removes the neko from the DOM and clears its animation interval. Recreate spawns a fresh instance.`),l(m,g),l(f(`status: `),o))}},S={name:`Parent / Custom Container`,parameters:{controls:{disable:!0}},render:()=>{s();let e=document.createElement(`div`);return e.id=`nekoContainer`,setTimeout(()=>{if(!document.body.contains(e))return;let t=e.getBoundingClientRect();new a({nekoId:1,parent:e,origin:{x:t.left+t.width/2,y:t.top+t.height/2}})},0),u(d(`parent restricts mouse-event tracking to the container. The neko uses position:fixed so it can still move across the full viewport — it just won't react to the cursor outside the blue box.`),e,f(`new Neko({ parent: containerEl })`))}},C={name:`Parent / Custom Origin`,parameters:{controls:{disable:!0}},render:()=>{s();let e=document.createElement(`div`);e.id=`restingPlace`;let t=document.createElement(`div`);t.id=`nekoContainer`,t.appendChild(e);let n=l();return setTimeout(()=>{if(!document.body.contains(e))return;let r=e.getBoundingClientRect(),i=new a({nekoId:1,parent:t,origin:{x:r.left+r.width/2,y:r.top+r.height/2}}),o=c(`sleep()`,()=>{i.sleep(),o.disabled=!0,s.disabled=!1}),s=c(`wake()`,()=>{i.wake(),s.disabled=!0,o.disabled=!1},!0);n.appendChild(o),n.appendChild(s)},0),u(d(`The brown square marks the spawn origin. sleep() idles the neko in place; wake() resumes cursor tracking.`),t,n,f(`new Neko({ origin: { x, y } })`))}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: "Playground",
  tags: ["autodocs"],
  render: args => {
    const resolvedBreed = args.breed === "default (gif)" ? undefined : breedByName.get(args.breed);
    const resolvedSize = NekoSizeVariations[args.nekoSize];
    const isAlive = !!document.querySelector('[data-neko="1"]');
    if (playgroundNeko && isAlive) {
      // Hot-swap every property in place — neko keeps its current position
      playgroundNeko.setBreed(resolvedBreed);
      playgroundNeko.setSize(resolvedSize);
      playgroundNeko.setSpeed(args.speed);
      playgroundNeko.setAnimationSpeed(args.animationSpeed);
      if (args.defaultState === "sleep" && playgroundNeko.isAwake) playgroundNeko.sleep();
      if (args.defaultState === "awake" && !playgroundNeko.isAwake) playgroundNeko.wake();
    } else {
      nukeAll();
      playgroundNeko = new Neko({
        nekoId: 1,
        nekoSize: resolvedSize,
        speed: args.speed,
        animationSpeed: args.animationSpeed,
        defaultState: args.defaultState,
        origin: {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        },
        breed: resolvedBreed
      });
    }
    const breedLine = args.breed === "default (gif)" ? "" : \`\\n  breed: breeds.\${args.breed},\`;
    const snippet = [\`new Neko({\`, \`  nekoSize: NekoSizeVariations.\${args.nekoSize},\`, \`  speed: \${args.speed},\`, \`  animationSpeed: \${args.animationSpeed},\`, \`  defaultState: "\${args.defaultState}",\`, \`  origin: { x: window.innerWidth / 2, y: window.innerHeight / 2 },\` + breedLine, \`})\`].join("\\n");
    return app(desc("Move your cursor to make the neko follow it. Adjust controls in the panel to see changes."), code(snippet));
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: "State / Sleep & Wake Controls",
  args: {
    defaultState: "awake"
  },
  render: args => {
    nukeAll();
    const resolvedSize = NekoSizeVariations[args.nekoSize];
    const neko = new Neko({
      nekoId: 1,
      nekoSize: resolvedSize,
      speed: args.speed,
      animationSpeed: args.animationSpeed,
      defaultState: args.defaultState,
      origin: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
    });
    const st = pill(neko.isAwake ? "awake" : "asleep");
    const sleepBtn = btn("sleep()", () => {
      neko.sleep();
      st.textContent = "asleep";
      sleepBtn.disabled = true;
      wakeBtn.disabled = false;
    }, !neko.isAwake);
    const wakeBtn = btn("wake()", () => {
      neko.wake();
      st.textContent = "awake";
      wakeBtn.disabled = true;
      sleepBtn.disabled = false;
    }, neko.isAwake);
    return app(desc("sleep() stops cursor tracking and idles the neko in place. wake() resumes it."), row(sleepBtn, wakeBtn), row(code("neko.isAwake: "), st));
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: "State / Destroy & Recreate",
  render: args => {
    nukeAll();
    const resolvedSize = NekoSizeVariations[args.nekoSize];
    const resolvedBreed = args.breed === "default (gif)" ? undefined : breedByName.get(args.breed);
    let neko: Neko | null = new Neko({
      nekoId: 1,
      nekoSize: resolvedSize,
      speed: args.speed,
      animationSpeed: args.animationSpeed,
      breed: resolvedBreed
    });
    const st = pill("alive");
    const destroyBtn = btn("destroy()", () => {
      neko?.destroy();
      neko = null;
      st.textContent = "destroyed";
      destroyBtn.disabled = true;
      recreateBtn.disabled = false;
    });
    const recreateBtn = btn("Recreate", () => {
      nukeAll();
      neko = new Neko({
        nekoId: 1,
        nekoSize: resolvedSize,
        speed: args.speed,
        animationSpeed: args.animationSpeed,
        breed: resolvedBreed
      });
      st.textContent = "alive";
      destroyBtn.disabled = false;
      recreateBtn.disabled = true;
    }, true);
    return app(desc("destroy() removes the neko from the DOM and clears its animation interval. Recreate spawns a fresh instance."), row(destroyBtn, recreateBtn), row(code("status: "), st));
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: "Parent / Custom Container",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => {
    nukeAll();
    const container = document.createElement("div");
    container.id = "nekoContainer";

    // setTimeout(0) fires after Storybook finishes inserting the element,
    // so getBoundingClientRect() returns the final layout position.
    setTimeout(() => {
      if (!document.body.contains(container)) return;
      const rect = container.getBoundingClientRect();
      new Neko({
        nekoId: 1,
        parent: container,
        origin: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        }
      });
    }, 0);
    return app(desc("parent restricts mouse-event tracking to the container. " + "The neko uses position:fixed so it can still move across the full viewport — " + "it just won't react to the cursor outside the blue box."), container, code("new Neko({ parent: containerEl })"));
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: "Parent / Custom Origin",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => {
    nukeAll();
    const restingPlace = document.createElement("div");
    restingPlace.id = "restingPlace";
    const container = document.createElement("div");
    container.id = "nekoContainer";
    container.appendChild(restingPlace);
    const controls = row();
    setTimeout(() => {
      if (!document.body.contains(restingPlace)) return;
      const rect = restingPlace.getBoundingClientRect();
      const neko = new Neko({
        nekoId: 1,
        parent: container,
        origin: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        }
      });
      const sleepBtn = btn("sleep()", () => {
        neko.sleep();
        sleepBtn.disabled = true;
        wakeBtn.disabled = false;
      });
      const wakeBtn = btn("wake()", () => {
        neko.wake();
        wakeBtn.disabled = true;
        sleepBtn.disabled = false;
      }, true);
      controls.appendChild(sleepBtn);
      controls.appendChild(wakeBtn);
    }, 0);
    return app(desc("The brown square marks the spawn origin. sleep() idles the neko in place; wake() resumes cursor tracking."), container, controls, code("new Neko({ origin: { x, y } })"));
  }
}`,...C.parameters?.docs?.source}}},w=[`Playground`,`SleepWake`,`DestroyDemo`,`CustomParent`,`CustomOrigin`]}))();export{C as CustomOrigin,S as CustomParent,x as DestroyDemo,y as Playground,b as SleepWake,w as __namedExportsOrder,v as default};