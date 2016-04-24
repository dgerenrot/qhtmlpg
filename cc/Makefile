INCLUDE = include


ifneq ("$(strip $(findstring Windows, $(OS)))", "")

$(info WINDOWS DETECTED. )
$(info *** )
$(info You might want use Visual Studio solution provided with this project. )
$(info If your system has sed, grep and tr tools, you may comment out )
$(info the following error message in the Makefile and proceed. )
$(info *** )
$(info If using cygwin and gcc provided therein, you will not be   )
$(info able to run the resulting executable without cygwin1.dll and some others.)
$(info If so, consider using mingw gcc http://mingw.org)
$(info *** )

# May comment out and proceed.
$(error Quitting for now)
TARGET=qhtmlpg.exe
else
TARGET=qhtmlpg
endif


TEXT_VARS = usage.txt short_usage.txt
TEXT_HEADERS = $(foreach file, $(TEXT_VARS:.txt=.h), $(INCLUDE)/$(file))
BASENAME_UPPERCASE = $(basename $(<F)) | tr [:lower:] [:upper:]
GENERATED_WARNING = // GENERATED FILE! DO NOT EDIT!

all : $(TARGET)

$(INCLUDE)/%.h : %.txt
	echo -n '#ifndef __QHTML_' > $@
	echo -n $(BASENAME_UPPERCASE) >> $@
	echo '__' >> $@
	echo -n '#define __QHTML_' >> $@
	echo -n $(BASENAME_UPPERCASE) >> $@
	echo -n '__' >> $@
	echo >> $@
	echo '#include <string>' >> $@
	echo >> $@
	echo $(GENERATED_WARNING) >> $@
	echo >> $@
	echo 'using namespace std;' >> $@
	echo >> $@
	echo -n 'const string '  >> $@
	echo -n $(BASENAME_UPPERCASE) >> $@
	echo -n ' = ' >> $@
	sed 's/\\/\\\\/' $< | sed 's/"/\\"/g' | sed 's/\t/\\t/g' \
			| sed 's/^/"/' | sed 's/$$/\\n"/' >> $@
	echo ';' >> $@
	echo >> $@
	echo '#endif' >> $@


	
$(TARGET) : *.cc $(INCLUDE)/*.h  $(TEXT_HEADERS)
	g++  -o $(TARGET) *.cc -I $(INCLUDE) 

.PHONY : clean

clean : 
	rm -f $(TARGET)
	rm -f include/short_usage.h
	rm -f include/usage.h
