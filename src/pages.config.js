import Home from './pages/Home';
import Learn from './pages/Learn';
import Profile from './pages/Profile';
import PromptDetail from './pages/PromptDetail';
import Prompts from './pages/Prompts';
import RequestPrompt from './pages/RequestPrompt';
import SavedPrompts from './pages/SavedPrompts';
import Support from './pages/Support';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Learn": Learn,
    "Profile": Profile,
    "PromptDetail": PromptDetail,
    "Prompts": Prompts,
    "RequestPrompt": RequestPrompt,
    "SavedPrompts": SavedPrompts,
    "Support": Support,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};