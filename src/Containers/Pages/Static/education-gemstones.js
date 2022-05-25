import React from 'react'
import { Container, Col, Row, Image, Nav } from 'react-bootstrap';
import "../../../Assets/css/education.css"
import { Avatar, Breadcrumbs, Link, Typography } from '@material-ui/core';
import { NavLink, useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, Box } from '@mui/material';
import JanuaryStone from '../../../Assets/images/education/stone-type/jan-garnet.png';
import FebruaryStone from '../../../Assets/images/education/stone-type/feb-amythest.png';
import MarchStone from '../../../Assets/images/education/stone-type/mar-aquamarine.png';
import AprilStone from '../../../Assets/images/education/stone-type/apr-diamond.png';
import MayStone from '../../../Assets/images/education/stone-type/may-emerald.png';
import JuneStone from '../../../Assets/images/education/stone-type/june-pearls.png';
import JulyStone from '../../../Assets/images/education/stone-type/july-ruby.png';
import AugustStone from '../../../Assets/images/education/stone-type/aug-peridot.png';
import SeptemberStone from '../../../Assets/images/education/stone-type/sept-sapphire.png';
import OctoberStone from '../../../Assets/images/education/stone-type/oct-opal.png';
import NovemberStone from '../../../Assets/images/education/stone-type/citrine.png';
import DecemberStone from '../../../Assets/images/education/stone-type/blue-topaz.png';
import AlexandriteStone from '../../../Assets/images/education/stone-type/edu-alexandrite.png';
import BlackdiamondStone from '../../../Assets/images/education/stone-type/edu-blackdiamond.png';
import LabgrownStone from '../../../Assets/images/education/stone-type/edu-labgrown.png';
import LapisStone from '../../../Assets/images/education/stone-type/edu-lapis.png';
import MoonstoneStone from '../../../Assets/images/education/stone-type/edu-moonstone.png';
import MorganiteStone from '../../../Assets/images/education/stone-type/edu-morganite.png';
import OnyxStone from '../../../Assets/images/education/stone-type/edu-onyx.png';
import LabRhodoniteStone from '../../../Assets/images/education/stone-type/lab-rhodonite.png';
import SpinelStone from '../../../Assets/images/education/stone-type/edu-spinel.png';
import TanzaniteStone from '../../../Assets/images/education/stone-type/edu-tanzanite.png';
import TopazStone from '../../../Assets/images/education/stone-type/nov-topaz.png';
import TourmalineStone from '../../../Assets/images/education/stone-type/edu-tourmaline.png';
import TurquoiseStone from '../../../Assets/images/education/stone-type/dec-turquoise.png';
import ZirconStone from '../../../Assets/images/education/stone-type/edu-zircon.png';
import { Helmet } from 'react-helmet';


const EducationGemstones = () => {
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [byMonth, setByMonth] = React.useState('January');
    const handleChangeByMonth = (event, newValue) => {
        setByMonth(newValue);
    };
    const [byType, setByType] = React.useState('Alexandrite');
    const handleChangeByType = (event, newValue) => {
        setByType(newValue);
    };
    const history = useHistory();
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Gemstones List with Pictures and Meanings | Belgium Webnet</title>
                <meta name="description" content="Learn about gemstones and birthstones by using Belgium Webnet' Gemstone Guide. It has a picture of every month's birthstone and their different meanings."></meta>
                <meta name="keywords" content="gemstones charlotte NC, Charlotte gemstone"></meta>
            </Helmet>
            <div className="rcs_cart_section mt-3">
                <Container>
                    <Row>
                        <Col className="rcs_breadcrumb mb-2">
                            <Breadcrumbs aria-label="breadcrumb">
                                <NavLink underline="hover" color="inherit" to="/">
                                    Home
                                </NavLink>
                                <NavLink underline="hover" color="inherit" to="/education">
                                    Education
                                </NavLink>
                                <Typography color="text.primary">Metals</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <din className="rcs_top_heading">
                                <h1>Learn About Gemstones</h1>
                                <p className="mt-3">Learn about gemstones and birthstones by using our Gemstone Guide.</p>
                            </din>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="rcs_education_cotnent_pages rcs_education_cotnent_pages_gemstone">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Search by Month" value="1" />
                                        <Tab label="Search by Stone Type" value="2" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <div className="rcs_education_cotnent_pages rcs_education_cotnent_pages_gemstone_inner">
                                        <TabContext value={byMonth}>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                <TabList onChange={handleChangeByMonth} aria-label="lab API tabs example">
                                                    <Tab icon={<Avatar alt="January Stone" src={JanuaryStone} />} iconPosition="bottom" label="January" value="January"></Tab>
                                                    <Tab icon={<Avatar alt="February Stone" src={FebruaryStone} />} iconPosition="bottom" label="February" value="February" />
                                                    <Tab icon={<Avatar alt="March Stone" src={MarchStone} />} iconPosition="bottom" label="March" value="March" />
                                                    <Tab icon={<Avatar alt="April Stone" src={AprilStone} />} iconPosition="bottom" label="April" value="April" />
                                                    <Tab icon={<Avatar alt="May Stone" src={MayStone} />} iconPosition="bottom" label="May" value="May" />
                                                    <Tab icon={<Avatar alt="June Stone" src={JuneStone} />} iconPosition="bottom" label="June" value="June" />
                                                    <Tab icon={<Avatar alt="July Stone" src={JulyStone} />} iconPosition="bottom" label="July" value="July" />
                                                    <Tab icon={<Avatar alt="August Stone" src={AugustStone} />} iconPosition="bottom" label="August" value="August" />
                                                    <Tab icon={<Avatar alt="September Stone" src={SeptemberStone} />} iconPosition="bottom" label="September" value="September" />
                                                    <Tab icon={<Avatar alt="October Stone" src={OctoberStone} />} iconPosition="bottom" label="October" value="October" />
                                                    <Tab icon={<Avatar alt="November Stone" src={NovemberStone} />} iconPosition="bottom" label="November" value="November" />
                                                    <Tab icon={<Avatar alt="December Stone" src={DecemberStone} />} iconPosition="bottom" label="December" value="December" />
                                                </TabList>
                                            </Box>
                                            <TabPanel value="January">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>JANUARY BIRTHSTONE - GARNET</h2>
                                                    <p>Garnet comes from the Latin word granatus, meaning grain. Garnet is mostly mined in Southeast Asia, Brazil, and Africa. Occurring in every color except blue, the garnet is a versatile stone, appropriate for a multitude of applications and occasions.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="February">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>February Birthstone - Amethyst</h2>
                                                    <p>Amethyst is a member of the quartz family, and ranges in color from light to deep purple. Amethyst is derived from the Greek word emthystos meaning not drunk. The ancient Greeks and Romans made drinking cups out of Amethyst believing that it would prevent intoxication.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="March">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>March Birthstone - Aquamarine</h2>
                                                    <p>Aquamarine, from Latin “aqua marina” or “water of the sea”, was named because of its blue or turquoise color. In the U.S., Aquamarine can be found in central Colorado and Wyoming.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="April">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>April Birthstone - Diamond</h2>
                                                    <p>The word Diamond comes from the Greek word adamas, meaning unbreakable, or unalterable. Diamonds are composed of a single element, and are the purest of all the gemstones. The Diamond is the ultimate symbol of love, and is said to symbolize strength, and enhance relationships.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="May">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>May Birthstone - Emerald</h2>
                                                    <p>Emeralds can range in color from light to dark green. Its name comes from the Greek word smaragdos meaning green gem. Emeralds from Columbia are generally considered the most valuable.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="June">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>June Birthstone - Pearl</h2>
                                                    <p>When thinking of the Pearl the color white usually comes to mind, but you can find pearls in black, gray, blue, yellow cream, lavender and mauve. When purchasing a Pearl you want to consider the surface, luster, color, and shape. The ideal pearl is perfectly round and smooth, but there are many shapes of pearl.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="July">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>July Birthstone - Ruby</h2>
                                                    <p>The word Ruby is from the Latin ruber, meaning red. The ruby is pink-red in color. The Ruby is extremely hard, and second only to the diamond in hardness. The ruby is one of the four precious stones, along with sapphire, emerald, and diamond.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="August">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>August Birthstone - Peridot</h2>
                                                    <p>Peridot is one of the few gemstones that occur in only one color, an olive green. The most valued color is a dark olive-green.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="September">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>September Birthstone - Sapphire</h2>
                                                    <p>Sapphire is from the Greek word sappheiros, meaning blue stone. Although blue is the most well-known color for sapphires, sapphires are made up of any color of corundum except for red, which are rubies.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="October">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>October Birthstone - Opal</h2>
                                                    <p>97% of the world's Opal is from Australia. Opals fluctuate in color and are often multi-colored. The most valuable is black.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="November">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>November Birthstone - Citrine</h2>
                                                    <p>Citrine is a premier stone of manifestation, imagination, and personal will. Carrying the power of the sun, it is warm and comforting, energizing and life giving. It stimulates the chakras like the sunlight of spring, clearing the mind and stirring the soul to action.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="December">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>December Birthstone - Blue Topaz</h2>
                                                    <p>Blue Topaz is a stone of peacefulness, calming to the emotions, and ideal for meditation and connecting with spiritual beings. It is a natural magnifier of psychic abilities, assisting those who wish to attune to inner guidance, as well as those who serve others through readings or spiritual healing.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                        </TabContext>
                                    </div>
                                </TabPanel>
                                <TabPanel value="2">
                                    <div className="rcs_education_cotnent_pages rcs_education_cotnent_pages_gemstone_inner">
                                        <TabContext value={byType}>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                <TabList onChange={handleChangeByType} aria-label="lab API tabs example">
                                                    <Tab icon={<Avatar alt="January Stone" src={AlexandriteStone} />} iconPosition="bottom" label="Alexandrite" value="Alexandrite" />
                                                    <Tab icon={<Avatar alt="February Stone" src={FebruaryStone} />} iconPosition="bottom" label="Amethyst" value="Amethyst" />
                                                    <Tab icon={<Avatar alt="March Stone" src={MarchStone} />} iconPosition="bottom" label="Aquamarine" value="Aquamarine" />
                                                    <Tab icon={<Avatar alt="April Stone" src={AprilStone} />} iconPosition="bottom" label="Diamond" value="Diamond" />
                                                    <Tab icon={<Avatar alt="May Stone" src={BlackdiamondStone} />} iconPosition="bottom" label="Black Diamonds" value="Black Diamonds" />
                                                    <Tab icon={<Avatar alt="June Stone" src={LabgrownStone} />} iconPosition="bottom" label="Lab Grown Diamonds" value="Lab Grown Diamonds" />
                                                    <Tab icon={<Avatar alt="July Stone" src={MayStone} />} iconPosition="bottom" label="Emerald" value="Emerald" />
                                                    <Tab icon={<Avatar alt="August Stone" src={JanuaryStone} />} iconPosition="bottom" label="Garnet" value="Garnet" />
                                                    <Tab icon={<Avatar alt="September Stone" src={LapisStone} />} iconPosition="bottom" label="Lapis Lazuli" value="Lapis Lazuli" />
                                                    <Tab icon={<Avatar alt="October Stone" src={MoonstoneStone} />} iconPosition="bottom" label="Moonstones" value="Moonstones" />
                                                    <Tab icon={<Avatar alt="November Stone" src={MorganiteStone} />} iconPosition="bottom" label="Morganite" value="Morganite" />
                                                    <Tab icon={<Avatar alt="December Stone" src={OnyxStone} />} iconPosition="bottom" label="Onyx" value="Onyx" />
                                                    <Tab icon={<Avatar alt="January Stone" src={OctoberStone} />} iconPosition="bottom" label="Opal" value="Opal" />
                                                    <Tab icon={<Avatar alt="February Stone" src={JuneStone} />} iconPosition="bottom" label="Pearl" value="Pearl" />
                                                    <Tab icon={<Avatar alt="March Stone" src={AugustStone} />} iconPosition="bottom" label="Peridot" value="Peridot" />
                                                    <Tab icon={<Avatar alt="April Stone" src={LabRhodoniteStone} />} iconPosition="bottom" label="Rhodolite" value="Rhodolite" />
                                                    <Tab icon={<Avatar alt="May Stone" src={JulyStone} />} iconPosition="bottom" label="Ruby" value="Ruby" />
                                                    <Tab icon={<Avatar alt="June Stone" src={SeptemberStone} />} iconPosition="bottom" label="Sapphire" value="Sapphire" />
                                                    <Tab icon={<Avatar alt="July Stone" src={SpinelStone} />} iconPosition="bottom" label="Spinel" value="Spinel" />
                                                    <Tab icon={<Avatar alt="August Stone" src={TanzaniteStone} />} iconPosition="bottom" label="Tanzanite" value="Tanzanite" />
                                                    <Tab icon={<Avatar alt="September Stone" src={TopazStone} />} iconPosition="bottom" label="Topaz" value="Topaz" />
                                                    <Tab icon={<Avatar alt="October Stone" src={TourmalineStone} />} iconPosition="bottom" label="Tourmaline" value="Tourmaline" />
                                                    <Tab icon={<Avatar alt="November Stone" src={TurquoiseStone} />} iconPosition="bottom" label="Turquoise" value="Turquoise" />
                                                    <Tab icon={<Avatar alt="December Stone" src={ZirconStone} />} iconPosition="bottom" label="Zircon" value="Zircon" />
                                                </TabList>
                                            </Box>
                                            <TabPanel value="Alexandrite">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>ALEXANDRITE</h2>
                                                    <p>Named for Czar Alexander II, which is very fitting as it was discovered in Russia’s Ural Mountains in 1830. The same stone can appear to shift in hue between Purple and Sapphire Blue depending on the light it is exposed to.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Amethyst">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Amethyst</h2>
                                                    <p>A variety of quartz often used in jewelry, and was thought by the ancient Greeks to protect the owner from drunkenness, and even went so far as to carve drinking vessels from the stone.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Aquamarine">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Aquamarine</h2>
                                                    <p>A beautiful blue or cyan stone, commonly from Sri Lanka. The largest Aquamarine ever found weighed over 110kg in Brazil.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Diamond">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Diamond</h2>
                                                    <p>Though often thought of as a colorless stone, a truly colorless diamond is a rarity. Usually diamonds have a light yellow tint, sometimes brown. Unique in that it's the only gem comprised of a single element carbon.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Black Diamonds">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Black Diamonds</h2>
                                                    <p>This stone was considered in Medieval Times to have the ability to restore the love back to the relationship of a married couple. These Diamonds are black due to the vast quantity of inclusions in its Carbon structure.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Lab Grown Diamonds">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Lab Grown Diamonds</h2>
                                                    <p>These man-made diamonds are identical to the naked eye to a Natural Diamond that is created over billions of years below the surface of the Earth. In recent years, there’s been a large shift towards Lab Grown Diamonds due to their having a significantly smaller effect on the Earth.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Emerald">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Emerald</h2>
                                                    <p>A true, deep green color, the emerald is a striking stone alleged to give its wearer a quicker wit and a higher IQ. These rare gems are often carved into a rectangular step cut, which is known as the emerald cut.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Garnet">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Garnet</h2>
                                                    <p>Available in a variety of natural colors with reddish shades being the most common, the garnet is a fairly common gemstone most commonly used in the Late Antique Roman world, and were often inlaid in gold jewelry.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Lapis Lazuli">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Lapis Lazuli</h2>
                                                    <p>It’s name means blue stone, and was once considered to be a powerful aphrodisiac. Long ago it  was used to create the vibrant blue skies in Renaissance Paintings.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Moonstones">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Moonstones</h2>
                                                    <p>A stone of unearthly beauty, the inner glow is due to the scattering of light between microscopic layers of feldspar and other minerals. It is sometimes attributed to have feminine energies.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Morganite">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Morganite</h2>
                                                    <p>Commonly seen in pink and peach, Morganite usage has skyrocketed in recent years for use in fashion jewelry.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Onyx">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Onyx</h2>
                                                    <p>This volcanic product is naturally available in a multitude of colors, though most famously black, with a rich black color that is used in a variety of jewelry types.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Opal">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Opal</h2>
                                                    <p>The national gemstone of Australia, the Opal can appear in a variety of colors, with black being the rarest. A wonder of nature is the fire opal which can include colors that seem to flicker between yellow to orange to red to green.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Pearl">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Pearl</h2>
                                                    <p>A hard object that grows in the soft tissue of a shelled mollusk. The ideal pearl is perfectly round and smooth in shape, but are common in a variety of other shapes. Pearls are seen as a classy alternative to typical gemstones, and are frequently worn with nearly every level of classiness.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Peridot">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Peridot</h2>
                                                    <p>Peridot is simply gem-quality Olivine, and only occurs in one color: olive-green. Olivine tends to be rather common, however Peridots are rather rare and can be found in odd places such as lavas and meteroites.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Rhodolite">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Rhodolite</h2>
                                                    <p>A relatively inexpensive pink stone, Rhodolite is commonly discovered with blank manganese veins running through it. It’s name derives from the Greek word rhodos, which means "rose colored".</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Ruby">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Ruby</h2>
                                                    <p>The word ruby comes from ruber, which is Latin for red, and as such, Rubies are almost always red in color. Rubies and Pink Sapphires are commonly confused, and a Ruby must meet a minimum color saturation in order to be called a true ruby.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Sapphire">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Sapphire</h2>
                                                    <p>A gem long-associated with romance and royal leanings, Princess Di received a blue sapphire engagement ring from Prince Charles back in 1981. Despite a common misconception, not all sapphires are blue. Green, violet-blue, yellow, orange, pink and purple hued stones are known as “fancy” sapphires and range from very light to very dark in saturation.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Spinel">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Spinel</h2>
                                                    <p>Referred to in ancient Sanskrit as “the daughter of Ruby”, this stone comes in a similar range of colors and styles, though it also boasts a more modest pricing.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Tanzanite">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Tanzanite</h2>
                                                    <p>Naturally occuring only in the Tanzanian Mountains of Africa, this stone comes in a variety of shapes that can fluctuate between Lavender and Ocean Blue.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Topaz">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Topaz</h2>
                                                    <p>Naturally golden brown to yellow, it can appear in a variety of colors, but previously the name Topaz was used to refer to any yellowstone. Interestingly there is an English superstition that Topaz cured lunacy.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Tourmaline">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Tourmaline</h2>
                                                    <p>Available in a wide range of colors, Tourmaline’s name derives from the Sinhalese name, Turamali, which roughly translates to "stone with mixed colours". Occasionally they are discovered with a green to red color striation, which is referred to as "Watermelon Tourmaline".</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Turquoise">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Turquoise</h2>
                                                    <p>An opaque blue-to-green mineral, Turquoise has long been used to ornament clothing, tribal masks, and worn as jewelry. The iconic burial mask of Tutankhamun was inlaid with turquoise as well as other stones. It was long thought to be a holy stone that could bring the wearer good fortune.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="Zircon">
                                                <div className="rcs_education_gemstone_content">
                                                    <h2>Zircon</h2>
                                                    <p>Though most famously of a sky blue color, it can be nearly every color of the rainbow, from earth tones to near colorless, Zircon's rarity and relative inexpensivity make it a prime choice for fashion jewelry.</p>
                                                    <Button onClick={() => history.push('/gemstones')} variant="contained" className="rcs_education_button">Shop Gemstones</Button>
                                                </div>
                                            </TabPanel>
                                        </TabContext>
                                    </div>
                                </TabPanel>
                            </TabContext>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default EducationGemstones;