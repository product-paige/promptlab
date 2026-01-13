import Prompts from './pages/Prompts';
import SavedPrompts from './pages/SavedPrompts';
import PromptDetail from './pages/PromptDetail';
import RequestPrompt from './pages/RequestPrompt';
import Learn from './pages/Learn';
import Profile from './pages/Profile';
import Support from './pages/Support';
import Home from './pages/Home';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Prompts": Prompts,
    "SavedPrompts": SavedPrompts,
    "PromptDetail": PromptDetail,
    "RequestPrompt": RequestPrompt,
    "Learn": Learn,
    "Profile": Profile,
    "Support": Support,
    "Home": Home,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};