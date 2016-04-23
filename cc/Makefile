INCLUDE = include
ISCYGWIN = $(shell uname -a|grep -i cygwin > /dev/null; echo $$?)

ifeq ($(ISCYGWIN), 0)
	TARGET = qhtmlpg.exe
else
	TARGET = qhtmlpg
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
	g++ -static -o $(TARGET) *.cc -I $(INCLUDE) 

.PHONY : clean

clean : 
	rm -f $(TARGET)
	rm -f include/short_usage.h
	rm -f include/usage.h
