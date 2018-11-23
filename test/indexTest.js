import dotEvent from "dot-event"
import dotStore from "@dot-event/store"

import dotFs from "../dist/fs"

test("writeJson & readJson", async () => {
  const events = dotEvent()
  const store = dotStore({ events })

  dotFs({ events, store })

  const id = Math.random()
  const path = `${__dirname}/fixture/writeJson.json`

  await events.fsWriteJson({
    json: { id },
    path,
  })

  const readOut = await events.fsReadJson({
    path,
  })

  expect(readOut.id).toBe(id)
  expect(store.get("id")).not.toBe(id)
})

test("writeJson & readJson w/ save", async () => {
  const events = dotEvent()
  const store = dotStore({ events })

  dotFs({ events, store })

  const id = Math.random()
  const path = `${__dirname}/fixture/writeJson.json`

  await events.fsWriteJson({
    json: { id },
    path,
  })

  const out = await events.fsReadJson({
    path,
    save: true,
  })

  expect(out.id).toBe(id)
  expect(store.get("id")).toBe(id)
})

test("writeJson & readJson w/ save & props", async () => {
  const events = dotEvent()
  const store = dotStore({ events })

  dotFs({ events, store })

  const id = Math.random()
  const path = `${__dirname}/fixture/writeJson.json`

  await events.fsWriteJson("test", {
    json: { id },
    path,
  })

  const out = await events.fsReadJson("test", {
    path,
    save: true,
  })

  expect(out.id).toBe(id)
  expect(store.get("test.id")).toBe(id)
})
