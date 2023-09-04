// @ts-nocheck
// Typescript ignored mappings to overleaf ide functions

const wrappedWindow = () => window?.wrappedJSObject

export const csrf = () => wrappedWindow()?.csrfToken

export const cm6 = () => wrappedWindow()?._ide?.editorManager?.$scope?.editor?.sharejs_doc?.cm6

export const findEntityByPath = (assetsPath: string) => wrappedWindow()?._ide?.fileTreeManager?.findEntityByPath(assetsPath)

export const createFolder = (assetsPath: string, path: string = '/') => wrappedWindow()?._ide?.fileTreeManager?.createFolder(assetsPath, path)

export const cursorPos = () => cm6()?.view?.state?.selection?.ranges[0]?.from

export const cmInsert = (cursorPos: string, insertText: string) => cm6()?.cmInsert(cursorPos, insertText);

export const viewDispatch = (obj: any) => cm6()?.view?.dispatch(obj)