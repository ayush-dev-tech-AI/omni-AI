#include <cstdlib>
#include <iostream>

int main() {
    std::cout << "🔥 Summoning Omni AI..." << std::endl;

    int result = system("cmd /c omniai");

    if (result != 0) {
        std::cerr << "Launch failed." << std::endl;
    }

    return 0;
}