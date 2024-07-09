API_URL = "http://localhost:8000/"

FIRST_NAME = [
    'Иван',
    'Петр',
    'Сергей',
    'Александр',
    'Дмитрий',
    'Владимир',
    'Андрей',
    'Михаил',
    'Юрий',
    'Алексей',
]

MIDDLE_NAME = [
    'Иванович',
    'Петрович',
    'Сергеевич',
    'Александрович',
    'Дмитриевич',
    'Владимирович',
    'Андреевич',
    'Михайлович',
    'Юрьевич',
    'Алексеевич',
]

LAST_NAME = [
    'Иванов',
    'Петров',
    'Сергеев',
    'Александров',
    'Дмитриев',
    'Владимиров',
    'Андреев',
    'Михайлов',
    'Юрьев',
    'Алексеев',
]

REAGENT_NAMES = [
    'Вода',
    'Соль',
    'Сахар',
    'Мука',
    'Сода',
    'Спирт',
    'Масло',
    'Крахмал',
    'Кислота',
    'Щелочь',
    'Хлор',
    'Ацетон',
    'Аммиак',
    'Формалин',
    'Глицерин',
    'Эфир',
    'Метанол',
    'Этиловый спирт',
    'Медь',
    'Железо',
    'Алюминий',
    'Свинец',
    'Цинк',
    'Натрий',
    'Калий',
    'Магний',
    'Кальций',
    'Йод',
    'Фосфор',
    'Кремний',
    'Марганец',
    'Хром',
    'Никель',
    'Кобальт',
    'Молибден',
    'Вольфрам',
    'Ванадий',
    'Титан',
    'Цирконий',
    'Гафний',
    'Тантал',
    'Ниобий',
    'Рений',
    'Осмий',
    'Иридий',
    'Платина',
    'Золото',
]

REAGENTS = {
    'Вода': {'formula': 'H2O', 'cas': '7732-18-5', 'precursor': 'false'},
    'Соль': {'formula': 'NaCl', 'cas': '7647-14-5', 'precursor': 'false'},
    'Сахар': {'formula': 'C12H22O11', 'cas': '57-50-1', 'precursor': 'false'},
    'Мука': {'formula': 'none', 'cas': 'none', 'precursor': 'false'},
    'Сода': {'formula': 'NaHCO3', 'cas': '144-55-8', 'precursor': 'false'},
    'Спирт': {'formula': 'C2H5OH', 'cas': '64-17-5', 'precursor': 'false'},
    'Масло': {'formula': 'none', 'cas': 'none', 'precursor': 'false'},
    'Крахмал': {'formula': '(C6H10O5)n', 'cas': '9005-25-8', 'precursor': 'false'},
    'Кислота': {'formula': 'none', 'cas': 'none', 'precursor': 'false'},
    'Щелочь': {'formula': 'none', 'cas': 'none', 'precursor': 'false'},
    'Хлор': {'formula': 'Cl2', 'cas': '7782-50-5', 'precursor': 'false'},
    'Ацетон': {'formula': 'C3H6O', 'cas': '67-64-1', 'precursor': 'true'},
    'Аммиак': {'formula': 'NH3', 'cas': '7664-41-7', 'precursor': 'true'},
    'Формалин': {'formula': 'CH2O', 'cas': '50-00-0', 'precursor': 'true'},
    'Глицерин': {'formula': 'C3H8O3', 'cas': '56-81-5', 'precursor': 'true'},
    'Эфир': {'formula': 'C2H5OC2H5', 'cas': '60-29-7', 'precursor': 'true'},
    'Метанол': {'formula': 'CH3OH', 'cas': '67-56-1', 'precursor': 'true'},
    'Этиловый спирт': {'formula': 'C2H5OH', 'cas': '64-17-5', 'precursor': 'true'},
    'Медь': {'formula': 'Cu', 'cas': '7440-50-8', 'precursor': 'false'},
    'Железо': {'formula': 'Fe', 'cas': '7439-89-6', 'precursor': 'false'},
    'Алюминий': {'formula': 'Al', 'cas': '7429-90-5', 'precursor': 'false'},
    'Свинец': {'formula': 'Pb', 'cas': '7439-92-1', 'precursor': 'false'},
    'Цинк': {'formula': 'Zn', 'cas': '7440-66-6', 'precursor': 'false'},
    'Натрий': {'formula': 'Na', 'cas': '7440-23-5', 'precursor': 'false'},
    'Калий': {'formula': 'K', 'cas': '7440-09-7', 'precursor': 'false'},
    'Магний': {'formula': 'Mg', 'cas': '7439-95-4', 'precursor': 'false'},
    'Кальций': {'formula': 'Ca', 'cas': '7440-70-2', 'precursor': 'false'},
    'Йод': {'formula': 'I2', 'cas': '7553-56-2', 'precursor': 'false'},
    'Фосфор': {'formula': 'P', 'cas': '7723-14-0', 'precursor': 'true'},
    'Кремний': {'formula': 'Si', 'cas': '7440-21-3', 'precursor': 'false'},
    'Марганец': {'formula': 'Mn', 'cas': '7439-96-5', 'precursor': 'false'},
    'Хром': {'formula': 'Cr', 'cas': '7440-47-3', 'precursor': 'false'},
    'Никель': {'formula': 'Ni', 'cas': '7440-02-0', 'precursor': 'false'},
    'Кобальт': {'formula': 'Co', 'cas': '7440-48-4', 'precursor': 'false'},
    'Молибден': {'formula': 'Mo', 'cas': '7439-98-7', 'precursor': 'false'},
    'Вольфрам': {'formula': 'W', 'cas': '7440-33-7', 'precursor': 'false'},
    'Ванадий': {'formula': 'V', 'cas': '7440-62-2', 'precursor': 'false'},
    'Титан': {'formula': 'Ti', 'cas': '7440-32-6', 'precursor': 'false'},
    'Цирконий': {'formula': 'Zr', 'cas': '7440-67-7', 'precursor': 'false'},
    'Гафний': {'formula': 'Hf', 'cas': '7440-58-6', 'precursor': 'false'},
    'Тантал': {'formula': 'Ta', 'cas': '7440-25-7', 'precursor': 'false'},
    'Ниобий': {'formula': 'Nb', 'cas': '7440-03-1', 'precursor': 'false'},
    'Рений': {'formula': 'Re', 'cas': '7440-15-5', 'precursor': 'false'},
    'Осмий': {'formula': 'Os', 'cas': '7440-04-2', 'precursor': 'false'},
    'Иридий': {'formula': 'Ir', 'cas': '7439-88-5', 'precursor': 'false'},
    'Платина': {'formula': 'Pt', 'cas': '7440-06-4', 'precursor': 'false'},
    'Золото': {'formula': 'Au', 'cas': '7440-57-5', 'precursor': 'false'},
}
