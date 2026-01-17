# Interfejs Sprawdzarki TIN

## Opis projektu

Projekt jest aplikacją internetową typu **SPA (Single Page Application)** stworzoną w **Vue 3** z wykorzystaniem **Vite** oraz **TypeScript**. Aplikacja umożliwia przeglądanie wyników uzyskanych na platformie sprawdzarki TIN poprzez nowoczesny, własnoręcznie zaprojektowany interfejs użytkownika.

### Indywidualne wyniki studenta

Aplikacja pozwala na wyświetlanie **indywidualnych wyników studenta** na podstawie danych pobieranych z endpointu:  
https://bikol.vm.wmi.amu.edu.pl/tin/results/{id}

Prezentowane informacje obejmują:
- sumę uzyskanych punktów,
- punktację za poszczególne zadania,
- datę zaliczenia zadania oraz informacje dodatkowe,
- informację o realizacji zadania w terminie lub po terminie.

Dodatkowo wykorzystywane są dane z endpointu:  
https://bikol.vm.wmi.amu.edu.pl/tin/tasks  
zawierające informacje o maksymalnej liczbie punktów oraz terminach oddania poszczególnych zadań.

### Wyniki wszystkich studentów

Aplikacja umożliwia również przeglądanie **wyników wszystkich studentów** w formie tabelarycznej. Dane pobierane są z endpointu:  
https://bikol.vm.wmi.amu.edu.pl/tin/results

Funkcjonalności obejmują:
- prezentację wyników wszystkich studentów wraz z sumą punktów,
- wyróżnienie zadań niezrealizowanych oraz zrealizowanych po terminie,
- możliwość przechodzenia do profili indywidualnych studentów,
- sortowanie rankingu według numeru indeksu, sumy punktów oraz punktacji za poszczególne zadania,
- wizualne podświetlenie wybranego wiersza w tabeli.

### Cel projektu

Projekt został wykonany w celach edukacyjnych jako ćwiczenie pracy z nowoczesnym frameworkiem frontendowym, obsługą danych z zewnętrznych API oraz projektowaniem interfejsu użytkownika.

---

## 🛠️ Wykorzystane technologie
- Vue 3
- Vite
- TypeScript
- Vue Router
- HTML5
- CSS3
- Node.js / npm

---
## 📁 Struktura projektu

src/
├─ main.ts # punkt wejścia aplikacji
├─ App.vue # główny komponent aplikacji
├─ router.ts # konfiguracja routingu
├─ style.css # style globalne
├─ views/
│ ├─ HomeView.vue # widok strony głównej
│ ├─ StudentView.vue # widok danych studenta
│ └─ RankingView.vue # widok rankingu

---

## ▶️ Uruchomienie projektu lokalnie

### 1. Sklonuj repozytorium
git clone https://github.com/EwelinaMomot/Interfejs_Sprawdzarki_TIN.git

### 2. Przejdź do folderu projektu
cd Interfejs_Sprawdzarki_TIN

### 3. Zainstaluj zależności
npm install

### 4. Uruchom aplikację
npm run dev

### Aplikacja będzie dostępna pod adresem:

http://localhost:5173
